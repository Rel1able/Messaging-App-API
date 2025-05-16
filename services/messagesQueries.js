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

async function getChatMessages(senderId, receiverId) {
    const chatMessages = await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderId: +senderId,
                    receiverId: +receiverId
                },
                {
                    senderId: +receiverId,
                    receiverId: +senderId
                }
            ]
        },
        include: {
            receiver: true,
            sender: true
        }
    })
    const messagesSortedByDate = chatMessages.sort((a, b) => a.sent - b.sent)
    return messagesSortedByDate
}

module.exports = {
    sendMessage,
    getChatMessages
}