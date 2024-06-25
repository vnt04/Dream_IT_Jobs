const express = require("express");
const router = express.Router();

const companyController = require("../Controllers/CompanyController");

router.get("/", companyController.index);

module.exports = router;
