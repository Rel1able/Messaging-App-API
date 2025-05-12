const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function sendMessage(text, receiverId, senderId) {
    await prisma.message.create({
        data: {
            text: text,
            receiverId: +receiverId,
            senderId: +senderId
        }
    })
}

module.exports = {
    sendMessage
}