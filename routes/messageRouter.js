const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/messageController");


messageRouter.get("/:userId", messageController.getChatMessages);
messageRouter.post("/:userId", messageController.createMessage);

module.exports = messageRouter;