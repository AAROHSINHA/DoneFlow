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
        if(!validation_errors.isEmpty()) return response.status(400).json({type:"validation", error:validation_errors.array()});

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
             return response.status(400).json({type:"server", error: errors});     
        }
});

// 2. GET THE TASKS
router.get("/tasks/get-tasks", async (req, res) => {
  try {
    const userEmail = req?.session?.user?.email;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized - Email not in session" });
    }

    const resTasks = await Task.find({ email: userEmail });

    return res.status(200).json({ tasks: resTasks });

  } catch (error) {
    console.error("Error in get-tasks route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// 3. DELETE TASKS
router.post("/tasks/delete-task",
  express_validator.checkSchema(createTaskDeletionSchema),
  async (req, res) => {
    const validationErrors = express_validator.validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ type:"validation", error: validationErrors.array() });

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
              return response.status(404).json({ type:"server", message: "Stats not found for user" });
            }
      const result = await Task.deleteOne({
        email: data.email,
        title: data.title,
        tags: data.tags
      });

      if (result.deletedCount === 0)
        return res.status(404).json({ type: "server", error: "Task not found" });

      return res.status(202).json({ type:"success", message: "Task deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ type: "server", error: error });
    }
  }
);

// 4. GET THE TAGS.

router.get("/tasks/get-tags", async (request, response) => {
  try {
    const userEmail = request.session.user.email; // or request.user.email if using a different structure
    
    if (!userEmail) {
      return response.status(401).json({ error: 'User not authenticated' });
    }

    const uniqueTags = await Task.aggregate([
      { $match: { email: userEmail } }, // Filter tasks by user's email
      { $unwind: "$tags" },
      { $group: { _id: "$tags" } },
      { $sort: { _id: 1 } }
    ]);

    return response.status(200).json({ tags: uniqueTags.map(tag => tag._id) });
  } catch (error) {
    return response.status(400).json({ error: error.message });
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

    // update one
    if (spendTime <= 0) {
      return res.status(200).json({
        message: "No time to log — focus session was too short or cancelled"
      });
    }

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

      const updatedSession = Math.max(stats.longestFocusSession || 0, spendTime);
      await Stats.findOneAndUpdate(
        {email: email},
        {$set: {longestFocusSession: updatedSession}},
        {new: true}
      )
      

      const isSameDay =
        stats.currentDate === nowDate &&
        stats.currentMonth === nowMonth &&
        stats.currentYear === nowYear;

      // 5. Distribute spent time across hours
      const todayDateData = new Date();
      let currentHour = todayDateData.getHours();       
      const currentMinute = todayDateData.getMinutes();  
      let timeFocused = data.spendTime;    
      const focusIterator = (data.spendTime > 0) ? 1 : 0; 

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
              focusSession: focusIterator
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
      // Step 1: Clear old day & set metadata
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
            todaysFocusTime: 0 // reset for new day
          }
        }
      );

      // Step 2: Apply new day’s data via increment
      await Stats.findOneAndUpdate(
        { email },
        {
          $inc: {
            ...updates,
            timeSpend: spendTime,
            focusSession: 1,
            todaysFocusTime: focusIterator
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





module.exports = router;


