const mongoose = require("mongoose");
const ResetTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
    length: 6
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // 600 seconds = 10 minutes (for development 30s)
  }
});

const ResetTokenModel = mongoose.model("ResetToken", ResetTokenSchema);
module.exports = ResetTokenModel;
