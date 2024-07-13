const express = require("express");
const router = express.Router();

const companyController = require("../Controllers/CompanyController");

router.get("/:companyID", companyController.detail);
router.post("/add", companyController.addCompany);
router.get("/search", companyController.search);
router.get("/", companyController.index);

module.exports = router;
