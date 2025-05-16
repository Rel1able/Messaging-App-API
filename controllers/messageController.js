const db = require("../services/messagesQueries");


async function createMessage(req, res) {
    const receiverId = req.params.userId;
    try {
        await db.sendMessage(req.body.message, receiverId, req.user.id);
        res.json({ message: "Message was created" });
    } catch (err) {
        console.error(err);
    }
}

async function getChatMessages(req, res) {
    const senderId = req.user.id;
    const receiverId = req.params.userId;
    try {
        const chatMessages = await db.getChatMessages(senderId, receiverId);
        res.json({chatMessages})
        
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    createMessage,
    getChatMessages
}
