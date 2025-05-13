const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            status: true,
            about: true
        }
    })
    return users
}

module.exports = {
    getUsers
}