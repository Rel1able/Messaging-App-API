const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUsers(userId) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            status: true,
            about: true
            
        },
        where: {
            id: {
                not: +userId
            }
        }
    })
    return users
}

async function getUserById(userId) {
    const user = await prisma.user.findFirst({
        where: {
            id: +userId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            status: true,
            about: true
        }
    })
    return user
}

async function getContacts(userId) {
    const contacts = await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderId: +userId,
                },
                {
                    receiverId: +userId,
                }
            ]
        },
        select: {
            receiver: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    status: true,
                    about: true
                }
            } ,
            sender: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    status: true,
                    about: true
                }
            },
            senderId: true,
            receiverId: true
        },
        orderBy: {
            sent: "desc",
        }
    })

    
    const allContacts = [];
    
    contacts.forEach(contact => {
        if (contact.senderId === +userId) {
            allContacts.push(contact.receiver)
        } else {
            allContacts.push(contact.sender);
        }
    })

    const uniqueContacts = Array.from(new Set(allContacts.map(contact => contact.id))).map(id => {
        return allContacts.find(contact => contact.id === id)
    })
    return uniqueContacts
}

async function setOnline(userId) {
    await prisma.user.update({
        where: {
            id: +userId
        },
        data: {
            status: "Online"
        }
    })
}

async function setOffline(userId) {
    await prisma.user.update({
        where: {
            id: +userId
        },
        data: {
            status: "Offline"
        }
    })
}

async function updateUserDescription(userId, description) {
    await prisma.user.update({
        where: {
            id: +userId,
        },
        data: {
            about: description
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    getContacts,
    setOnline,
    setOffline,
    updateUserDescription
}