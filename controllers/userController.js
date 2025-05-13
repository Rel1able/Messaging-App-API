const db = require("../services/userQueries");

async function getAllUsers(req, res) {
    const users = await db.getUsers();
    res.json({"Users": users})
}

module.exports = {
    getAllUsers
}