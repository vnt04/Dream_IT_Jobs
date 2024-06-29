const express = require("express");
const router = express.Router();

const companyController = require("../Controllers/CompanyController");

router.get('/search',companyController.search);
router.get("/", companyController.index);

module.exports = router;
