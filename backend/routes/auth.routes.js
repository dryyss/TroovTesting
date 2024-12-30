const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Routes publiques
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Routes protégées
router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;
