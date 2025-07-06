const express = require("express");
const UserRoutes = require("./users.js");
const TaskRoutes = require("./tasks.js");
const statsRoutes = require("./stats.js");

const router = express.Router();
router.use(UserRoutes);
router.use(TaskRoutes);    
router.use(statsRoutes);
module.exports = router;


