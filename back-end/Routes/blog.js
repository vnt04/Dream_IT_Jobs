const express = require("express");
const router = express.Router();

const blogController = require("../Controllers/BlogController");

router.get("/", blogController.index);

module.exports = router;
