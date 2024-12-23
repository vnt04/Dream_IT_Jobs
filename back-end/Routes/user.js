const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");

router.post("/sign-up", userController.userSignUp);
router.patch("/verify-email", userController.verifyEmail);
router.post("/login", userController.userLogin);
router.get("/", userController.index);

module.exports = router;
