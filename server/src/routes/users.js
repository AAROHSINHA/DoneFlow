const express = require("express");
const express_validator = require("express-validator");
const {createUserValidationSchema} = require("../utils/schemas/UserValidationSchema.js");
const {createUserLoginSchema} = require("../utils/schemas/UserLoginSchema.js");
const bcrypt = require("bcrypt");
const User = require("../utils/models/UserModel.js");

const router = express.Router();
router.get("/users", (request, response) => {
    return response.status(200).send("Works");
})

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
router.post("/users/logout", (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return response.status(500).send({ error: "Logout failed" });
    }
    response.clearCookie("connect.sid", {
      path: "/",
      sameSite: "lax",
      secure: false,
    });
    return response.status(200).send({ message: "Logged out successfully" });
  });
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
        const newUser = new User(data);
        try{
            const savedUser = await newUser.save();
            return response.status(201).send(savedUser);
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


module.exports = router
