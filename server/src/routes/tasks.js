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



module.exports = router;


