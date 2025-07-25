const express = require("express");
const {createStatsTaskUpdateSchema} = require("../utils/schemas/StatsTaskUpdateSchema.js");
const {createCompleteTaskUpdateSchema} = require("../utils/schemas/StatsTaskUpdateSchema.js");
const {createProgressTaskUpdateSchema} = require("../utils/schemas/StatsTaskUpdateSchema.js");
const {createUpdateDailyStatsSchema} = require("../utils/schemas/StatsTaskUpdateSchema.js");
const session = require('express-session');
const express_validator = require("express-validator");
const Stats = require("../utils/models/StatsModel.js");



const router = express.Router();

// 0. GET TASK COMPLETED AND TASKS REMAINING
router.get("/stats/summary", async (request, response) => {
  const email = request.query.email;
  if (!email) {
    return response.status(400).json({ message: "Email is required" });
  }
  try {
    const stats = await Stats.findOne({ email });

    if (!stats) {
      return response.status(404).json({ message: "Stats not found for user" });
    }

    const tasksCompleted = stats.tasksCompleted;
    const totalTasks = stats.totalTasks;
    const tasksProgress = stats.startedTasks.length;

    return response.status(200).json({
      tasksCompleted,
      totalTasks,
      tasksProgress
    });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

// Get stats for dashboard
router.get("/stats/get-stats", async (request, response) => {
   const user = request.session?.user;
    if (!user || !user.email) {
    return response.status(400).json({
      success: false,
      message: "Email not found in session"
    });
  }
    const email = user.email;
    try{
      const res = await Stats.findOne({email: email}).lean();
      return response.status(200).json({success: true, body: res});
    }catch(error){
      console.log(error);
      return response.status(400).json({success: false, error: error});
    }
});

// 1. ADD TASKS
router.patch("/stats/add-task", 
  express_validator.checkSchema(createStatsTaskUpdateSchema),
  async (request, response) => {
    const validation_errors = express_validator.validationResult(request);
    if (!validation_errors.isEmpty()) {
      return response.status(400).json({ type:"validation", error: validation_errors.array() });
    }

    const { email } = express_validator.matchedData(request);

    try {
      const updatedStats = await Stats.findOneAndUpdate(
        { email },
        {$inc: { totalTasks: 1, netTotalTasks: 1 }},  // you can add more fields to increment
        { new: true } // return updated doc
      );

      if (!updatedStats) {
        return response.status(404).json({ type:"server" });
      }

      return response.status(200).json({ message: "Task count incremented", data: updatedStats });
    } catch (error) {
      return response.status(500).json({ type:"server", error: error.message });
    }
  }
);


// 2. TASK COMPLETED
router.patch("/stats/complete-task", 
  express_validator.checkSchema(createCompleteTaskUpdateSchema),
  async (request, response) => {
    const validation_errors = express_validator.validationResult(request);
    if (!validation_errors.isEmpty()) {
      return response.status(400).json({ type: "validation", error: validation_errors.array() });
    }

    const { email, title, deadlineDate, deadlineMonth } = express_validator.matchedData(request);

    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const todayObj = new Date();
      const todayDate = todayObj.getDate();
      const todayMonth = todayObj.getMonth() + 1;
      let onTimeIncrement = 0;
      if(deadlineDate >= todayDate && deadlineMonth >= todayMonth) onTimeIncrement = 1;
      if(todayDate == 0) onTimeIncrement = 0;

      const updatedStats = await Stats.findOneAndUpdate(
        { email },
        {
          $inc: { tasksCompleted: 1, onTimeCompletedTasks: onTimeIncrement },
          $push: {
            completedTasks: {
              title,
              date: today
            }
          },
          $pull: {
            startedTasks: title  // this works since it's just an array of strings
          }
        },
        { new: true }
      ).exec(); // <-- this ensures the query is executed

      if (!updatedStats) {
        return response.status(404).json({ type:"server", message: "Stats not found for user" });
      }

      return response.status(200).json({ type:"success", message: "Task marked as completed", data: updatedStats });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ type: "server", error: error.message });
    }
  }
);


// 3. DELETE TASKS
router.patch("/stats/delete-task", 
  express_validator.checkSchema(createStatsTaskUpdateSchema),
  async (request, response) => {
    const validation_errors = express_validator.validationResult(request);
    if (!validation_errors.isEmpty()) {
      return response.status(400).json({ title: "Validation Error", error: validation_errors.array() });
    }

    const data = express_validator.matchedData(request);
    const email = data.email;
    const title = data.title;
    try {
      const updatedStats = await Stats.findOneAndUpdate(
        { email },
        {
          $inc: { totalTasks: -1 },
          $pull: { startedTasks: title }  // 👈 this removes title from array if present
        },
        { new: true }
      ).exec();

      if (!updatedStats) {
        return response.status(404).json({ message: "Stats not found for user" });
      }

      return response.status(200).json({ message: "Task deleted and removed from progress if present", data: updatedStats });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
);


// ADDING THE PROGRESSED TASKS
router.post("/stats/start-progress",
    express_validator.checkSchema(createProgressTaskUpdateSchema),
    async (request, response) => {
    const validation_errors = express_validator.validationResult(request);
    if (!validation_errors.isEmpty()) {
      return response.status(400).json({ title: "Validation Error", error: validation_errors.array() });
    }

    const data = express_validator.matchedData(request);
    const email = data.email;
    const title = data.title;

    try{
        await Stats.findOneAndUpdate(
            {email: email},
            {$addToSet: {startedTasks: title}},
            {new: true}
        );
        return response.status(200).json({message: "Progress Started"});
    }catch(error){
        return response.status(500).json({ error: error.message });
    }


})

// navigation analytics
router.get("/stats/navigation-analytics", async (request, response) => {
  const user = request.session?.user;
  if (!user || !user.email) {
    return response.status(400).json({
      success: false,
      message: "Email not found in session"
    });
  }
  try {
    const stats = await Stats.findOne({ email: user.email });
    if (!stats) {
      return response.status(404).json({
        success: false,
        message: "Stats not found for user"
      });
    }
    const todayHours = stats.focusPerHour || [];
    const tasksCompleted = stats.tasksCompleted || 0;
    const totalTasksNet = stats.netTotalTasks || 0;
    const totalTime = stats.timeSpend || 1;
    const hours = todayHours.reduce((sum, hour) => sum + hour, 0);
    return response.status(200).json({
      success: true,
      hours: hours,
      tasks: tasksCompleted,
      totalTasks: totalTasksNet,
      spendTime: totalTime
    });

  } catch (error) {
    return response.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// update stats
router.post("/stats/update-daily",
  express_validator.checkSchema(createUpdateDailyStatsSchema),
  async (request, response) => {

    const validation_errors = express_validator.validationResult(request);
    if (!validation_errors.isEmpty()) {
      return response.status(400).json({ type: "validation", error: validation_errors.array() });
    }

    const data = express_validator.matchedData(request);
    const now = new Date();

    const todaysDate = now.getDate();
    const todaysMonth = now.getMonth();
    const todaysYear = now.getFullYear();

    try {
      const userStats = await Stats.findOne({ email: data.email });
      if (!userStats) {
        return response.status(404).json({ type: "not-found", error: "User stats not found" });
      }

      const { currentDate: lastDate, currentMonth: lastMonth, currentYear: lastYear } = userStats;

      const sameDay = lastDate === todaysDate && lastMonth === todaysMonth && lastYear === todaysYear;

      if (!sameDay) {
        const yesterdayFocus = userStats.focusPerHour.reduce((acc, val) => acc + val, 0);

        const lastWeekFocus = userStats.focusLastWeek || []; // fallback if undefined
        const updatedWeeklyFocus = [...lastWeekFocus.slice(1), yesterdayFocus];

        await Stats.findOneAndUpdate(
          { email: data.email },
          {
            $set: {
              focusLastWeek: updatedWeeklyFocus,
              focusPerHour: Array(7).fill(0),
              currentDate: todaysDate,
              currentMonth: todaysMonth,
              currentYear: todaysYear
            }
          }
        );
      }

      return response.status(200).json({ type: "success" });

    } catch (error) {
      console.error(error); // helpful for debugging
      return response.status(500).json({ type: "server", error: "Something went wrong" });
    }

  }
);




module.exports = router
