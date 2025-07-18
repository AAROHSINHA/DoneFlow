const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
  type: String,
  minlength: 5,
  maxlength: 128,
  required: function () {
    return this.createdVia === 'local';
  },
},
  googleId: {
    type: String,
    required: false,
  },
  createdVia: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
