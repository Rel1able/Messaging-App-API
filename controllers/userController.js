const db = require("../services/userQueries");

async function getAllUsers(req, res) {
    const users = await db.getUsers(req.user.id);
    res.json({users})
}

async function getUserById(req, res) {
    const user = await db.getUserById(req.params.userId);
    res.json({ user });
}

async function getContacts(req, res) {
    console.log("user id", req.user.id)
    const contacts = await db.getContacts(req.user.id);
    res.json({contacts})
}

module.exports = {
    getAllUsers,
    getUserById,
    getContacts
}