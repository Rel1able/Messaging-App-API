const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");


userRouter.get("/",passport.authenticate("jwt", { session: false }), userController.getAllUsers)
userRouter.get("/contacts",passport.authenticate("jwt", {session: false}), userController.getContacts)
userRouter.get("/:userId", userController.getUserById)
userRouter.put("/:userId/online",passport.authenticate("jwt", {session: false}), userController.setOnline);
userRouter.put("/:userId/offline",passport.authenticate("jwt", {session: false}), userController.setOffline);
userRouter.put("/:userId/about",passport.authenticate("jwt", {session: false}), userController.validateDescription, userController.updateUserDescription)


module.exports = userRouter