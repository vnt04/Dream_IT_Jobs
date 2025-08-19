const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/sign-up", userController.userSignUp);
router.patch("/verify-email", userController.verifyEmail);
router.post("/login", userController.userLogin);
router.get("/google-login", userController.googleLogin);
router.get("/google/callback", userController.googleCallback);
router.get("/logout", authMiddleware, userController.logout);
router.get("/refresh-token", userController.refreshToken);
router.get("/me", authMiddleware, userController.getMe);
router.get("/", userController.index);

module.exports = router;
