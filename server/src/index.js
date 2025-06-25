const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// this is a sample test data
const sampleNames = [
    "Aaroh", "Rishabh", "Unnati"
]


// MIDDLEWARES
// using cors to setup connection to the react app
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// simple get api to check if server runs or not
app.get("/", (request, response) => {
    return response.status(200).send(sampleNames);
});

// sample post request to check connectivity between frontend and backend
app.post("/api/names", (request, response) => {
    const { body } = request;
    const sample_name = body.name;
    sampleNames.push(sample_name);
    return response.status(201).send("CREATED");
})


// Connecting the backend app to server
app.listen(PORT, () => {
    console.log(`SERVER STARTED AT PORT : ${PORT}`);
});