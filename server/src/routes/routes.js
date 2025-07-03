const express = require("express");
const UserRoutes = require("./users.js");
const TaskRoutes = require("./tasks.js");

const router = express.Router();;
router.use(UserRoutes);
router.use(TaskRoutes);    


module.exports = router;


