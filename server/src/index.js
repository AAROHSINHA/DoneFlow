const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("../src/routes/routes.js");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("../src/passport/googleauth.js");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
dotenv.config();

// connecting to the mongoose server
const DB_LINK = process.env.MONGODB_SERVER;
mongoose.connect(DB_LINK)
.then(() => console.log("CONNECTED TO DATABASE"))
.catch((err) => console.log(err))

const app = express();
const PORT = process.env.PORT || 5000;


// MIDDLEWARES
// using cors to setup connection to the react app
const allowedOrigins = [
  "https://doneflow.vercel.app",
  "https://doneflow.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.set("trust proxy", 1); 
app.use(session({
    secret: "session123123123321321321",
    resave:false,
    saveUninitialized: false,
    cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    sameSite: 'none',
    secure: true,
    
    },
    store:MongoStore.create({
        mongoUrl: DB_LINK, // Mongo URI
        collectionName: "sessions",
        stringify: false
    })
}))
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

// 🔐 Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // ✅ Manually store user in session
    console.log(req.user);
    req.session.user = {
      id: req.user._id,
      name: req.user.firstName,
      email: req.user.email
    };

    // Optionally redirect back to frontend
    res.redirect("https://doneflow.vercel.app/"); 
  }
);

// simple get api to check if server runs or not
app.get("/", (request, response) => {
    return response.status(200).send("SERVER RUNS");
});

// Connecting the backend app to server
app.listen(PORT, () => {
    console.log(`SERVER STARTED AT PORT : ${PORT}`);
});
