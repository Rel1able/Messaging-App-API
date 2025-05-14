const db = require("../services/userQueries");

async function getAllUsers(req, res) {
    const users = await db.getUsers();
    res.json({users})
}

async function getUserById(req, res) {
    const user = await db.getUserById(req.params.userId);
    res.json({ user });
}

module.exports = {
    getAllUsers,
    getUserById
}