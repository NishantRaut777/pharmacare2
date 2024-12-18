const express = require("express");
const { registerController, loginController, authController, logoutController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/getUserData", authMiddleware, authController);

module.exports = router;