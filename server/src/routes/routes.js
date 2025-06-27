const express = require("express");
const UserRoutes = require("./users.js")

const router = express.Router();;
router.use(UserRoutes);
module.exports = router;


