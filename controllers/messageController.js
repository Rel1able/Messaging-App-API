const db = require("../services/messagesQueries");


async function createMessage(req, res) {
    const receiverId = req.params.userId;
    try {
        await db.sendMessage(req.body.text, receiverId, req.user.id);
        res.json({ message: "Message was created" });
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createMessage
}
