const express = require("express");
const express_validator = require("express-validator");
const {createUserValidationSchema} = require("../utils/schemas/UserValidationSchema.js");
const {createUserLoginSchema} = require("../utils/schemas/UserLoginSchema.js");
const bcrypt = require("bcrypt");
const User = require("../utils/models/UserModel.js");
const ResetToken = require("../utils/models/ResetTokenModel.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Stats = require("../utils/models/StatsModel.js");
const session = require('express-session');
const {createFeedbackSchema} = require("../utils/schemas/FeedbackSchema.js");
dotenv.config();

const router = express.Router();
router.get("/users", (request, response) => {
    return response.status(200).send("Works");
})

const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_PROVIDER,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
})

const createToken = async () => {
  const number = Math.floor(100000 + Math.random() * 900000);
  const token = number.toString();
  const saltRounds = 10;
  const tokenHashed = await bcrypt.hash(token, saltRounds);
  return { rawToken: token, tokenHashed };
};

// 0. check for login
router.get("/users/me", (req, res) => {
  console.log("USERS/ME session ID:", req.sessionID);
  console.log("SESSION DATA:", req.session);
  const user = req.session.user;
  console.log("USER", typeof user);
  if (req.session && req.session.user) {
    return res.status(200).json({
      loggedIn: true,
      user: req.session.user
    });
  } else {
    return res.status(200).json({
      loggedIn: false,
      user: null
    });
  }
});

// 1. local sign in
router.post("/users/create-local-account", 
    express_validator.checkSchema(createUserValidationSchema),
    async (request, response) => {
        const validation_errors = express_validator.validationResult(request);
        if(!validation_errors.isEmpty()) return response.status(400).json({
          type: "validation",
          error:validation_errors.array()
        });
        const data = express_validator.matchedData(request);
        const saltRounds = 10;
        const hashedData = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedData;
        const email_id = data.email;

        try{
          const newUser = new User(data);
          // creating stats for user on account creation
          const today = new Date();
          const newStats = new Stats({
            email: email_id,
            netTotalTasks: 0,
            totalTasks: 0,
            tasksCompleted: 0,
            totalTime: 0,
            timeSpend: 0,
            onTimeCompletedTasks: 0,
            focusPerHour: Array(24).fill(0),
            focusPerDay: [],
            focusLastWeek: Array(7).fill(0),
            completedTasks: [],
            startedTasks: [],
            focusPhase: Array(8).fill(0),
            currentDate: today.getDate(),
            currentMonth: today.getMonth() + 1,
            currentYear: today.getFullYear(),
            todaysFocusTime: 0,
            focusSession: 0,
            longestFocusSession: 0
        });
            const savedStats = await newStats.save();
            const savedUser = await newUser.save();
            return response.status(201).json({
              user: savedUser,
              stats: savedStats
            });
        }catch(error){
            return response.status(400).json({message:"server", error: error});
        }
})

// 2. local login
router.post("/users/local-login",
    express_validator.checkSchema(createUserLoginSchema),
    async (req, res) => {
        const errors = express_validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                type: "validation",
                error: errors.array()
            });
        }

        try {
            const data = express_validator.matchedData(req);
            const user = await User.findOne({ email: data.email });

            if (!user || !(await bcrypt.compare(data.password, user.password))) {
                return res.status(404).json({ type: "credentials" });
            }

            if (req.session.user) {
                console.log("Logging out previous user:", req.session.user.email);
                req.session.user = null;
            }

            req.session.user = {
                id: user._id,
                email: user.email,
                name: user.firstName,
            };
            req.session.save();

            return res.status(200).json({
                message: "Login successful",
                user: req.session.user,
            });

        } catch (err) {
            console.error("Login error:", err);
            return res.status(500).json({ type: "server" });
        }
    }
);


// 3. Check is logged in
router.get("/users/check-login", (req, res) => {
  if (req.session && req.session.user) {
    return res.status(200).json({
      loggedIn: true,
      user: req.session.user
    });
  } else {
    return res.status(200).json({
      loggedIn: false,
      user: null
    });
  }
});

// 4. logout
router.post("/users/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Logout failed" });
      } else {
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logged out successfully" });
      }
    });
  } else {
    // No session exists
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "No active session, but logged out anyway" });
  }
});

// 5. Send Emails
router.post("/users/send-email", async (request, response) => {
  const email_id = request.body.email;

  // ✅ 1. Basic Input Validation
  if (!email_id || typeof email_id !== "string") {
    return response.status(400).json({ type: "credentials", error: "Invalid email format" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_id)) {
    return response.status(400).json({ type: "credentials", error: "Invalid email format" });
  }

  try {
    // ✅ 2. Check user existence
    const userFound = await User.findOne({ email: email_id });
    if (!userFound) {
      return response.status(401).json({ type: "credentials" });
    }

    // ✅ 3. Delete existing reset token
    await ResetToken.deleteOne({ email: email_id });

    const { rawToken, tokenHashed } = await createToken();
    const newToken = new ResetToken({ email: email_id, token: tokenHashed });

    await newToken.save();

    // ✅ 4. Send email
    const request_name = "DoneFlow User";
    const mailOptions = {
      from: "doneflow94@gmail.com",
      to: `${request_name} <${email_id}>`,
      subject: "Token For Password Change",
      text: `Token - ${rawToken}  |  (Expires in 10 minutes!!)`,
    };

    const info = await emailTransporter.sendMail(mailOptions);
    console.log("Email Sent : ", info.response);

    return response.status(200).json({
      status: "success",
      message: "Email sent successfully",
      rawToken,
    });

  } catch (error) {
    console.error("Error in send-email route:", error);
    return response.status(500).json({
      status: "server",
      message: "Something went wrong. Please try again.",
    });
  }
});


// 6. Change password
router.patch("/users/change-password", async (request, response) =>{
   const {body} = request;
   if(!body.new_password || !body.email) return response.status(400).json({type: "credentials"}); 
  const email_id = body.email;
  const userFound = await User.findOne({ email: email_id });
  if (!userFound) {
    return response
      .status(401)
      .json({ type: "credentials" });
  }
  const data = body;
  if(!data.new_password) return response.status(401).json({ type: "credentials" });

  try{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.new_password, saltRounds);

    const updatedUser = await User.findOneAndUpdate(
      { email: email_id },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return response
        .status(500)
        .json({ type: "server" });
    }

    return response.json({
      message: "Password updated successfully",
    });
  }catch(error){
    console.error("Error updating password:", error);
    return response.status(500).json({
      type: "server",
      message: "Error updating password, please try again.",
    });
  }

})

// 7. Send Feedback
router.post(
  "/send-feedback",
  express_validator.checkSchema(createFeedbackSchema),
  async (request, response) => {
    const validation_errors = express_validator.validationResult(request);
    if (!validation_errors.isEmpty()) {
      return response.status(400).json({
        success: false,
        type: "validation error",
        error: validation_errors.array(), // fixed typo: should be .array()
      });
    }

    const data = express_validator.matchedData(request);

    // No fields provided
    if (!data.email && !data.rating && !data.feedback) {
      return response.status(200).json({
        success: true,
        type: "no feedback",
        message: "No feedback data provided. Skipping email.",
      });
    }

    const mailOptions = {
      from: "doneflow94@gmail.com",
      to: "doneflow94@gmail.com",
      subject: "New Feedback On Site",
      text: `
You received the following feedback about the site:

Message: ${data.feedback || "Feedback Not Provided"}

Rating: ${data.rating || "Rating Not Provided"}

Sender: ${data.email || "Anonymous"}
      `.trim(),
      ...(data.email ? { replyTo: data.email } : {}), // Optional reply-to
    };

    try {
      const info = await emailTransporter.sendMail(mailOptions);
      console.log("Feedback email sent:", info.response);

      return response.status(200).json({
        success: true,
        type: "feedback sent",
        message: "Feedback email sent successfully.",
      });
    } catch (error) {
      console.error("Error sending feedback email:", error);
      return response.status(500).json({
        success: false,
        type: "email error",
        message: "Failed to send feedback email. Please try again later.",
      });
    }
  }
);

module.exports = router
