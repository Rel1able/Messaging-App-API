const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");


userRouter.get("/", userController.getAllUsers)
userRouter.get("/contacts", userController.getContacts)
userRouter.get("/:userId", userController.getUserById)
userRouter.put("/:userId/online", userController.setOnline);
userRouter.put("/:userId/offline", userController.setOffline)


module.exports = userRouter