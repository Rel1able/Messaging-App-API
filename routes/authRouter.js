const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const passport = require("../config/passport");


authRouter.post("/log-in", passport.authenticate("local"), authController.login)
authRouter.post("/sign-up", authController.validateSignUp, authController.signUp)

authRouter.get("/log-out", authController.logout);
authRouter.get("/ping", authController.ping)
module.exports = authRouter