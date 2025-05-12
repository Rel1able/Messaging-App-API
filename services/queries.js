const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUserByName(username) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    return user
}

async function getUserById(userId) {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    return user
}

async function createUser(username, password) {
    await prisma.user.create({
        data: {
            username: username,
            password: password

        }
    })
}


module.exports = {
    getUserByName,
    getUserById,
    createUser
}