const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUserByName(username) {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    return user
}

async function getUserById(userId) {
    const user = await prisma.user.findFirst({
        where: {
            id: +userId
        }
    })
    return user
}

async function createUser(firstName, lastName, username, password) {
    await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password

        }
    })
}

//  async function clear() {
//     await prisma.message.deleteMany({})
//      await prisma.user.deleteMany({});
//      await prisma.session.deleteMany({})

// }

// clear()

module.exports = {
    getUserByName,
    getUserById,
    createUser
}