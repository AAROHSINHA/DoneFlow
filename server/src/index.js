const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("../src/routes/routes.js");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
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
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.set("trust proxy", 1); 
app.use(session({
    secret: "session123123123321321321",
    resave:false,
    saveUninitialized: false,
    cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    sameSite: 'lax',
    secure: false,
    },
    store:MongoStore.create({
        mongoUrl: DB_LINK, // Mongo URI
        collectionName: "sessions",
        stringify: false
    })
}))
app.use(express.json());
app.use(routes);

// simple get api to check if server runs or not
app.get("/", (request, response) => {
    return response.status(200).send("SERVER RUNS");
});

// Connecting the backend app to server
app.listen(PORT, () => {
    console.log(`SERVER STARTED AT PORT : ${PORT}`);
});