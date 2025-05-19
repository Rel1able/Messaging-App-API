const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");


userRouter.get("/", userController.getAllUsers)
userRouter.get("/contacts", userController.getContacts)
userRouter.get("/:userId", userController.getUserById)


module.exports = userRouter