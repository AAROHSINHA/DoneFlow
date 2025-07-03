const mongoose = require("mongoose"); 

const TaskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false
  },
  title: {
    type: String,
    required: true,
    unique: false,
    minlength: 1,  
    maxlength: 32
  },
  tags: {
    type: [String],
    required: true,
    validate: [
      {
        validator: function (val) {
          return val.length >= 0 && val.length <= 4;
        },
        message: "Tags array must contain 0–4 tags."
      }
    ],
    unique: false
  },
  priority: {
    type: String,
    required: false,
    unique: false
  },
  progress: {
    type: Number,
    required: true,
    unique: false,
    min: 0,
    max: 100
  },
  estimateTime: {
    type: Number,
    required: false,
    unique: false
  },
  spendTime: {
    type: Number,
    required: false,
    unique: false
  },
  deadlineDate: {
    type: Number,
    required:false,
    unique:false,
    min:0,
    max:31
  },
  deadlineMonth: {
    type: Number, // e.g., "Jan"
    required: false,
    unique: false,
    min: 0, 
    max: 12
  }
});

// ✅ Fix typo in model name and export
module.exports = mongoose.model("Task", TaskSchema);
