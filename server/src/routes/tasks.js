const express = require("express");
const express_validator = require("express-validator");
const express_session = require("express-session");
const dotenv = require("dotenv");
const {createTaskValidationSchema} = require("../utils/schemas/TaskValidationSchema.js");
const {createTaskDeletionSchema} = require("../utils/schemas/TaskDeletionSchema.js");
const {createAddTimeSchema} = require("../utils/schemas/TaskValidationSchema.js");
const Task = require("../utils/models/TaskModel.js");
const Stats = require("../utils/models/StatsModel.js");
dotenv.config();

const router = express.Router();

// 1. ADD TASKS TO USER
router.post("/tasks/add-task", 
    express_validator.checkSchema(createTaskValidationSchema),
    async (request, response) => {
        const validation_errors = express_validator.validationResult(request);
        if(!validation_errors.isEmpty()) return response.status(400).json({title:"Validation Error", error:validation_errors.array()});

        // Start adding
        const data = express_validator.matchedData(request);
        const task = {
            email: data.email,
            title: data.title,
            tags: data.tags,
            priority: data.priority ? data.priority : "low",
            progress: data.progress ? data.progress : 0,
            estimateTime: data.estimateTime ? data.estimateTime : 0,
            spendTime: data.spendTime ? data.spendTime : 0,
            deadlineDate: data.deadlineDate ? data.deadlineDate : 0,
            deadlineMonth: data.deadlineMonth ? data.deadlineMonth : 0,
        }

        const newTask = new Task(task);
        try{
            const savedTask = await newTask.save();
            await Stats.findOneAndUpdate({email: data.email},
              {$inc: {totalTime: data.estimateTime}}
            )
            return response.status(201).json({
                title: "Created Tasks",
                task: savedTask
            })
            
        }catch(errors){
             return response.status(400).json({title:"Task Save Error", error: errors});     
        }
});

// 2. GET THE TASKS
router.get("/tasks/get-tasks", async (req, res) => {
  if (!req.session || !req.session.user || !req.session.user.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const resTasks = await Task.find({ email: req.session.user.email });
    return res.status(200).json({ tasks: resTasks });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// 3. DELETE TASKS
router.post("/tasks/delete-task",
  express_validator.checkSchema(createTaskDeletionSchema),
  async (req, res) => {
    const validationErrors = express_validator.validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ title: "Validation Error", error: validationErrors.array() });

    const data = express_validator.matchedData(req);
    const email = data.email;
    const title = data.title;
    try {
      const updatedStats = await Stats.findOneAndUpdate(
              { email },
              {
                $pull: {
                  startedTasks: title  // this works since it's just an array of strings
                }
              },
              { new: true }
            ).exec(); // <-- this ensures the query is executed
      
            if (!updatedStats) {
              return response.status(404).json({ message: "Stats not found for user" });
            }
      const result = await Task.deleteOne({
        email: data.email,
        title: data.title,
        tags: data.tags
      });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Task not found" });

      return res.status(202).json({ message: "Task deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
);

// 4. GET THE TAGS.

router.get("/tasks/get-tags", async (request, response) => {
  try {
    const uniqueTags = await Task.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags" } },
      { $sort: { _id: 1 } }
    ]);
    
    return response.status(200).json({ tags: uniqueTags.map(tag => tag._id) });
  } catch (error) {
    return response.status(400).json({ error });
  }
});

// 5. ADD SPENT TIME 
router.post("/tasks/add-time", 
  express_validator.checkSchema(createAddTimeSchema),
  async (req, res) => {
    const validationErrors = express_validator.validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ title: "Validation Error", error: validationErrors.array() });
    }

    const data = express_validator.matchedData(req);
    const { email, title, spendTime } = data;

    try {
      // 1. Increment spendTime in Task
      await Task.findOneAndUpdate(
        { email, title },
        { $inc: { spendTime: spendTime } },
        { new: true }
      );

      // 2. Fetch updated Task
      const task = await Task.findOne({ email, title }).select("spendTime estimateTime").lean();
      if (!task) return res.status(404).json({ message: "Task not found" });

      // 3. Prepare Date
      const now = new Date();
      const nowDate = now.getDate();
      const nowMonth = now.getMonth() + 1;
      const nowYear = now.getFullYear();
      const nowHour = now.getHours();
      const nowMinute = now.getMinutes();

      // 4. Get Stats
      const stats = await Stats.findOne({ email }).lean();
      if (!stats) return res.status(404).json({ message: "Stats not found" });

      const isSameDay =
        stats.currentDate === nowDate &&
        stats.currentMonth === nowMonth &&
        stats.currentYear === nowYear;

      // 5. Distribute spent time across hours
      const todayDateData = new Date();
      let currentHour = todayDateData.getHours();       
      const currentMinute = todayDateData.getMinutes();  
      let timeFocused = data.spendTime;     

      let updates = {};
      const originalHour = currentHour;

      while (timeFocused > 0 && currentHour >= 0) {
        if (currentHour === originalHour) {
          // The current hour, so we only account for minutes up to now
          if (currentMinute - timeFocused >= 0) {
            updates[`focusPerHour.${currentHour}`] = timeFocused;
            timeFocused = 0;
          } else {
            updates[`focusPerHour.${currentHour}`] = currentMinute;
            timeFocused -= currentMinute;
          }
        } else {
          if (timeFocused >= 60) {
            updates[`focusPerHour.${currentHour}`] = 60;
            timeFocused -= 60;
          } else {
            updates[`focusPerHour.${currentHour}`] = timeFocused;
            timeFocused = 0;
          }
        }

        currentHour -= 1;
      }

      // -------------------------------
      // CASE 1: SAME DAY
      // -------------------------------
      if (isSameDay) {
        await Stats.findOneAndUpdate(
          { email },
          {
            $inc: {
              ...updates,
              todaysFocusTime: spendTime,
              timeSpend: spendTime,
              focusSession: 1
            }
          },
          { new: true }
        );

        const exceeds = task.spendTime > task.estimateTime;
        return res.status(200).json({
          message: "SpendTime successfully incremented",
          exceeds
        });
      }

      // -------------------------------
      // CASE 2: NEW DAY
      // -------------------------------

      // 1. Sum up yesterday's focusPerHour
      const lastDayFocus = Math.max(0, spendTime - (nowHour * 60 + nowMinute));
      const yesterdayTotal = stats.focusPerHour.reduce((sum, val) => sum + val, 0);
      const totalYesterdayFocus = yesterdayTotal + lastDayFocus;

      // 2. Generate focusPhase array
      let focusPhaseArr = [];
      for (let i = 0; i < 24; i += 3) {
        const chunkSum = stats.focusPerHour
          .slice(i, i + 3)
          .reduce((sum, val) => sum + val, 0);
        focusPhaseArr.push(chunkSum);
      }

      // 3. Shift focusLastWeek
      const lastWeek = [...stats.focusLastWeek.slice(1), totalYesterdayFocus];

      // 4. Set + Inc Updates
      await Stats.findOneAndUpdate(
        { email },
        {
          $set: {
            currentDate: nowDate,
            currentMonth: nowMonth,
            currentYear: nowYear,
            focusPhase: focusPhaseArr,
            focusLastWeek: lastWeek,
            focusPerHour: Array(24).fill(0),
            todaysFocusTime: spendTime
          },
          $inc: {
            ...updates,
            timeSpend: spendTime,
            focusSession: 1
          }
        },
        { new: true }
      );

      const exceeds = task.spendTime > task.estimateTime;
      return res.status(200).json({
        message: "SpendTime added and day rollover handled",
        exceeds
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
);



/*
router.post("/tasks/add-time", 
  express_validator.checkSchema(createAddTimeSchema),
  async (req, res) => {
    const validationErrors = express_validator.validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ title: "Validation Error", error: validationErrors.array() });
    }

    const data = express_validator.matchedData(req);
    const { email, title, spendTime } = data;

    try {
      // 1. Increment spendTime
      await Task.findOneAndUpdate(
        { email, title },
        { $inc: { spendTime } },
        { new: true }
      );

      // 2. Fetch updated values to compare
      const task = await Task.findOne({ email, title }).select("spendTime estimateTime").lean();

     // 3. Incrementing the Stats
     const todayDateData = new Date();
      let currentHour = todayDateData.getHours();       
      const currentMinute = todayDateData.getMinutes();  
      let timeFocused = data.spendTime;     

      let updates = {};
      const originalHour = currentHour;

      while (timeFocused > 0 && currentHour >= 0) {
        if (currentHour === originalHour) {
          // The current hour, so we only account for minutes up to now
          if (currentMinute - timeFocused >= 0) {
            updates[`focusPerHour.${currentHour}`] = timeFocused;
            timeFocused = 0;
          } else {
            updates[`focusPerHour.${currentHour}`] = currentMinute;
            timeFocused -= currentMinute;
          }
        } else {
          if (timeFocused >= 60) {
            updates[`focusPerHour.${currentHour}`] = 60;
            timeFocused -= 60;
          } else {
            updates[`focusPerHour.${currentHour}`] = timeFocused;
            timeFocused = 0;
          }
        }

        currentHour -= 1;
      }

      // checking the date (10pm->1am or start at 1am->4am type cases)
      const statsDateData = await Stats.findOne({ email: email })
      .select("currentDate currentMonth currentYear")
      .lean();
      const currentDate = statsDateData.currentDate;
      const currentMonth = statsDateData.currentMonth;
      const currentYear = statsDateData.currentYear;

      const todayDate = todayDateData.getDate();
      const todayMonth = todayDateData.getMonth() + 1;
      const todayYear = todayDateData.getFullYear();

      const isSameDay =
          currentDate === todayDate &&
          currentMonth === todayMonth &&
          currentYear === todayYear;
      
      if(isSameDay){
      await Stats.findOneAndUpdate(
        { email: data.email },
        { $inc: updates, todaysFocusTime: timeFocused },
        { new: true }
      );


      if (task) {
        const exceeds = task.spendTime > task.estimateTime;
        return res.status(200).json({ message: "SpendTime successfully incremented", exceeds });
      } else {
        return res.status(404).json({ message: "Task not found" });
      }
    }else{
      // main logic
      
      // 1. Sum up hourly array. add it to todayFocusedHours. add lastdaysession to todayFocusedHours
      // 2. implement the focusPhases functionality
      // 3. clear the hourly array
      // 4. add todayFocusHours to lastWeekFocus
      // -> if last active day was 10 july and we are adding on 15july, have the reasonable gap
      // 5. update currentDate
      

      // 1.
     let lastDayFocus = timeFocused - (60*currentHour + currentMinute);
     lastDayFocus = min(0, lastDayFocus);
      let totalCurrentDayFocusHour = await Stats.findOne({email: email}).select("todaysFocusTime");
      totalCurrentDayFocusHour += lastDayFocus;

      // 2. FocusPhases
      const focusPhases = await Stats.find({email: email}).select("focusPerHour");
      let focusPhaseArr = [];
      for(let i = 0; i < focusPhases.size(); i+=3){
        let focusMinutes = focusPhases[i] + focusPhases[i + 1] + focusPhases[i + 2];
        focusPhaseArr.push(focusMinutes);
      }


      // 3. clear the hourly array
      await Stats.findOneAndUpdate(
        { email: email },
        {
          $set: { focusPerHour: Array(24).fill(0) },
          $inc: updates
        },
        { new: true }
    );

      // 4. Add todayFocusHours to last week
      let lastWeekData = Array(7).fill(0); 
      if(currentMonth!=todayMonth || currentYear!=todayYear){
        lastWeekData[0] = totalCurrentDayFocusHour;
      }else{
        // dates
        const dateDifference = todayDate - currentDate;
        for(let i = dateDifference; i < 7; i+=1){
          lastWeekData[i - dateDifference] = lastWeekData[i];
          lastWeekData[i] = 0;
        }
        lastWeekData[6] = totalCurrentDayFocusHour;
      }

      // update current date, focus Phase and lastWeek difference
      await Stats.findOneAndUpdate(
        {email: email},
        {$set: {
          currentDate: todayDate,
          currentMonth: todayMonth,
          currentYear: todayYear,
          focusPhase: focusPhaseArr,
          focusLastWeek: lastWeekData,
          todaysFocusTime: timeFocused - totalCurrentDayFocusHour
        }}
      )




    }} catch (error) {
      return res.status(500).json({ error: error.message });
    }
});
*/
/* 
router.post("/tasks/add-time", 
  express_validator.checkSchema(createAddTimeSchema),
  async (req, res) => {
    const validationErrors = express_validator.validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ title: "Validation Error", error: validationErrors.array() });
    }

    const data = express_validator.matchedData(req);
    const { email, title, spendTime } = data;

    try {
      // 1. Increment spendTime
      await Task.findOneAndUpdate(
        { email, title },
        { $inc: { spendTime } },
        { new: true }
      );

      // 2. Fetch updated values to compare
      const task = await Task.findOne({ email, title }).select("spendTime estimateTime").lean();

     // 3. Incrementing the Stats
      let currentHour = new Date().getHours();       
      const currentMinute = new Date().getMinutes();  
      let timeFocused = data.spendTime;     

      let updates = {};
      const originalHour = currentHour;

      while (timeFocused > 0 && currentHour >= 0) {
        if (currentHour === originalHour) {
          // The current hour, so we only account for minutes up to now
          if (currentMinute - timeFocused >= 0) {
            updates[`focusPerHour.${currentHour}`] = timeFocused;
            timeFocused = 0;
          } else {
            updates[`focusPerHour.${currentHour}`] = currentMinute;
            timeFocused -= currentMinute;
          }
        } else {
          if (timeFocused >= 60) {
            updates[`focusPerHour.${currentHour}`] = 60;
            timeFocused -= 60;
          } else {
            updates[`focusPerHour.${currentHour}`] = timeFocused;
            timeFocused = 0;
          }
        }

        currentHour -= 1;
      }
      // adding stats 
      await Stats.findOneAndUpdate(
        { email: data.email },
        { $inc: updates },
        { new: true }
      );


      if (task) {
        const exceeds = task.spendTime > task.estimateTime;
        return res.status(200).json({ message: "SpendTime successfully incremented", exceeds });
      } else {
        return res.status(404).json({ message: "Task not found" });
      }

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
});

*/


module.exports = router;


