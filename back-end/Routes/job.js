const express = require("express");
const router = express.Router();

const jobController = require("../Controllers/JobController");

router.get("/search", jobController.search);
router.post("/dang-bai", jobController.postJob);
router.get("/:jobID", jobController.detail);
router.get("/", jobController.index);

module.exports = router;
