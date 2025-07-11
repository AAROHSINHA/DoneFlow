const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  // email needed for validation
  email: {
    type: String,
    required: true,
    unique: false
  },

  netTotalTasks: {
    type: Number,
    required: true,
    min: 0
  },

  totalTasks: {
    type: Number,
    required: true,
    min: 0
  },

  tasksCompleted: {
    type: Number,
    required: true,
    min: 0
  },

  totalTime: {
    type: Number, //  net in minutes (estimated time)
    required: true
  },

  timeSpend: {
    type: Number, // net in minutes (actual focused time)
    required: true
  },

  onTimeCompletedTasks : {
    type: Number,
    required: true,
    min: 0
  },

  // 24 values, each index represents one hour of the day (0-23)
  focusPerHour: {
    type: [Number], // array of 24 numbers
    validate: arr => arr.length === 24,
    required: true,
    default: () => Array(24).fill(0)
  },

  // Daily focus tracking (for the past 7 or 30 days)
  focusPerDay: {
    type: [
      {
        date: { type: String, required: true }, // e.g. "2025-07-05"
        minutes: { type: Number, required: true, min: 0 }
      }
    ],
    default: []
  },

  // Monthly focus tracking — array of 28–31 days
  focusLastWeek: {
    type: [Number], // index: 0 to 30 (days of month), value: minutes
    required: true,
    default: () => Array(7).fill(0)
  },
   completedTasks: {
    type: [
      {
        title: { type: String, required: true },
        date: { type: String, required: true } // format: YYYY-MM-DD
      }
    ],
    default: []
  },
  startedTasks: {
    type: [String],
    required: false,
    unique:false,
    default: []
  },
  focusPhase: {
    type: [Number], // array of 24 numbers
    validate: arr => arr.length === 8,
    required: true,
    default: () => Array(8).fill(0)
  },
    currentDate: {
    type: Number,
    required: true,
    min: 1,
    max: 31
  },

  currentMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },

  currentYear: {
    type: Number,
    required: true,
    min: 2000 // or whatever range you expect
  },

  todaysFocusTime: {
  type: Number,          // running total of today's focused minutes
  required: true,
  default: 0,
  min: 0
},
focusSession: {
  type: Number,          // running total of today's focused minutes
  required: true,
  default: 0,
  min: 0
},
longestFocusSession: {
  type: Number,
  required: true,
  default: 0,
  min: 0
}


});

module.exports = mongoose.model("Stats", StatsSchema);


/*
const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  // email needed for validation
  email: {
    type: String,
    required: true,
    unique: false
  },
  
  totalTasks: {
    type: Number,
    required: true,
    min: 0
  },

  tasksCompleted: {
    type: Number,
    required: true,
    min: 0
  },

  totalTime: {
    type: Number, // in minutes (estimated time)
    required: true
  },

  timeSpend: {
    type: Number, // in minutes (actual focused time)
    required: true
  },

  // 24 values, each index represents one hour of the day (0-23)
  focusPerHour: {
    type: [Number], // array of 24 numbers
    validate: arr => arr.length === 24,
    required: true,
    default: () => Array(24).fill(0)
  },

  // Daily focus tracking (for the past 7 or 30 days)
  focusPerDay: {
    type: [
      {
        date: { type: String, required: true }, // e.g. "2025-07-05"
        minutes: { type: Number, required: true, min: 0 }
      }
    ],
    default: []
  },

  // Monthly focus tracking — array of 28–31 days
  focusPerMonth: {
    type: [Number], // index: 0 to 30 (days of month), value: minutes
    required: true,
    default: () => Array(31).fill(0)
  },
   completedTasks: {
    type: [
      {
        title: { type: String, required: true },
        date: { type: String, required: true } // format: YYYY-MM-DD
      }
    ],
    default: []
  },
  startedTasks: {
    type: [String],
    required: false,
    unique:false,
    default: []
  }
});

module.exports = mongoose.model("Stats", StatsSchema);

*/