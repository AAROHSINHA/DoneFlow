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
        if(!validation_errors.isEmpty()) return response.status(400).send(validation_errors.array());
        const data = express_validator.matchedData(request);
        const saltRounds = 10;
        const hashedData = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedData;
        const email_id = data.email;

        try{
          const newUser = new User(data);
          // creating stats for user on account creation
          const newStats = new Stats({
            email: email_id,
            totalTasks: 0,
            tasksCompleted: 0,
            totalTime: 0,
            timeSpend: 0,
            // focusPerHour, focusPerDay, and focusPerMonth will be filled by default values
          });
            const savedStats = await newStats.save();
            const savedUser = await newUser.save();
            return response.status(201).json({
              user: savedUser,
              stats: savedStats
            });
        }catch(error){
            return response.status(400).send(error);
        }
})

// 2. local login
router.post("/users/local-login",
    express_validator.checkSchema(createUserLoginSchema),
    async (request, response) => {
        const validation_errors = express_validator.validationResult(request);
        if (!validation_errors.isEmpty()) {
            return response.status(400).send(validation_errors.array());
        }

        const data = express_validator.matchedData(request);

        // 1. find the user in the User db
        const foundUser = await User.findOne({ email: data.email });
        if (!foundUser) {
            return response.status(404).send({ error: "User Not Found" });
        }

        // 2. check password
        const match = await bcrypt.compare(data.password, foundUser.password);
        if (!match) {
            return response.status(404).send({ error: "Invalid Password" });
        }

        // Log out previous session if needed
        if (request.session.user) {
            console.log("Logging out previous user:", request.session.user.email);
            request.session.user = null;
        }

        // 3. Save user info into session
        request.session.user = {
            id: foundUser._id,
            email: foundUser.email,
            name: foundUser.firstName,
        };
        request.session.save();
        console.log(request.session);
        console.log("LOGIN session ID:", request.sessionID);


        // 4. Send success response
        return response.status(200).json({
            message: "Login successful",
            user: {
                id: foundUser._id,
                email: foundUser.email,
                name: foundUser.firstName,
            },
        });
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

  const userFound = await User.findOne({ email: email_id });
  if (!userFound) {
    return response
      .status(401)
      .json({ error: "Session/User not found/logged in!" });
  }
  await ResetToken.deleteOne({ email: email_id });
  const { rawToken, tokenHashed } = await createToken();

  // 1. Store the token in DB
  const newObj = {
    email: email_id,
    token: tokenHashed,
  };

  const newToken = new ResetToken(newObj);

  try {
    await newToken.save();
  } catch (error) {
    console.error(error);
    return response
      .status(400)
      .json({ error: "Some Error Occurred while saving token." });
  }
  // 2. Send the email
  try {
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
      rawToken: rawToken
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return response.status(500).json({
      status: "error",
      message: "Error sending email, please try again.",
    });
  }
});

// 6. Change password
router.patch("/users/change-password", async (request, response) =>{
   const {body} = request;
   if(!body.new_password || !body.email) return response.status(400).json({error:"No email/password entered"}); 
  const email_id = body.email;
  const userFound = await User.findOne({ email: email_id });
  if (!userFound) {
    return response
      .status(401)
      .json({ error: "No Such Email Exists" });
  }
  const data = body;
  if(!data.new_password) return response.status(401).json({ error: "No Password Entered" });

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
        .json({ error: "Error updating password" });
    }

    return response.json({
      message: "Password updated successfully",
    });
  }catch(error){
    console.error("Error updating password:", error);
    return response.status(500).json({
      status: "error",
      message: "Error updating password, please try again.",
    });
  }

})

module.exports = router
