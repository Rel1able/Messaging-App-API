const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            status: true,
            about: true
            
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

module.exports = {
    getUsers,
    getUserById
}