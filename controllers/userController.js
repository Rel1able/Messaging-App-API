const db = require("../services/userQueries");
const { body, validationResult } = require("express-validator");

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

async function setOnline(req, res) {
    const userId = req.params.userId;
    await db.setOnline(userId);
    res.json({msg: "Status of user is now online"})
}

async function setOffline(req, res) {
    const userId = req.params.userId;
    await db.setOffline(userId);
    res.json({msg: "Status of user is now offline"})
}

async function updateUserDescription(req, res) {
    const userId = req.params.userId;
    const description = req.body.description;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        await db.updateUserDescription(userId, description)
        res.json({msg: "user's description updated"})
    } catch (err) {
        console.error(err);
    }
}

const validateDescription = [
    body("description")
        .isLength({max: 50}).withMessage("The description must be no longer than 50 characters")
]

module.exports = {
    getAllUsers,
    getUserById,
    getContacts,
    setOnline,
    setOffline,
    updateUserDescription,
    validateDescription
}