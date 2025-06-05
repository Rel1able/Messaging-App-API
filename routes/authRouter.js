const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const passport = require("../config/passport");


authRouter.post("/log-in", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({success: false, message: "Invalid credentials"})
        }
        req.login(user, (err) => {
            if (err) return next(err);
            return authController.login(req, res);
        });
    })(req, res, next)
    
})
authRouter.post("/sign-up", authController.validateSignUp, authController.signUp)

authRouter.get("/log-out", authController.logout);
authRouter.get("/ping", authController.ping)
module.exports = authRouter