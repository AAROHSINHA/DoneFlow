const express = require("express");
const {createStatsTaskUpdateSchema} = require("../utils/schemas/StatsTaskUpdateSchema.js");
const {createCompleteTaskUpdateSchema} = require("../utils/schemas/StatsTaskUpdateSchema.js");
const {createProgressTaskUpdateSchema} = require("../utils/schemas/StatsTaskUpdateSchema.js");
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

// 1. ADD TASKS
router.patch("/stats/add-task", 
  express_validator.checkSchema(createStatsTaskUpdateSchema),
  async (request, response) => {
    const validation_errors = express_validator.validationResult(request);
    if (!validation_errors.isEmpty()) {
      return response.status(400).json({ title: "Validation Error", error: validation_errors.array() });
    }

    const { email } = express_validator.matchedData(request);

    try {
      const updatedStats = await Stats.findOneAndUpdate(
        { email },
        {$inc: { totalTasks: 1 }},  // you can add more fields to increment
        { new: true } // return updated doc
      );

      if (!updatedStats) {
        return response.status(404).json({ message: "Stats not found for user" });
      }

      return response.status(200).json({ message: "Task count incremented", data: updatedStats });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
);


// 2. TASK COMPLETED
router.patch("/stats/complete-task", 
  express_validator.checkSchema(createCompleteTaskUpdateSchema),
  async (request, response) => {
    const validation_errors = express_validator.validationResult(request);
    if (!validation_errors.isEmpty()) {
      return response.status(400).json({ title: "Validation Error", error: validation_errors.array() });
    }

    const { email, title } = express_validator.matchedData(request);

    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const updatedStats = await Stats.findOneAndUpdate(
        { email },
        {
          $inc: { tasksCompleted: 1 },
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
        return response.status(404).json({ message: "Stats not found for user" });
      }

      return response.status(200).json({ message: "Task marked as completed", data: updatedStats });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: error.message });
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

module.exports = router
