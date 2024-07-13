const express = require("express");
const router = express.Router();

const recruiterController = require('../Controllers/RecruiterController')

router.get("/", recruiterController.index);


module.exports = router;