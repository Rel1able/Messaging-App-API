const db = require("../services/userQueries");

async function getAllUsers(req, res) {
    const users = await db.getUsers();
    res.json({users})
}

module.exports = {
    getAllUsers
}