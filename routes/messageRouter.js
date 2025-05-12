const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/messageController");


messageRouter.post("/:userId", messageController.createMessage);

module.exports = messageRouter;