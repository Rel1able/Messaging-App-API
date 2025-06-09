const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/messageController");
const passport = require("passport");


messageRouter.get("/:userId",passport.authenticate("jwt", {session: false}), messageController.getChatMessages);
messageRouter.post("/:userId",passport.authenticate("jwt", {session: false}), messageController.createMessage);

module.exports = messageRouter;