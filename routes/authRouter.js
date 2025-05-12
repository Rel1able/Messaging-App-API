const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/log-in", authController.login)
authRouter.post("/sign-up", authController.signUp)

authRouter.get("/log-out", authController.logout);

module.exports = authRouter