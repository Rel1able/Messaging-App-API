const bcrypt = require("bcryptjs");
const db = require("../services/authQueries");

async function signUp(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.username, hashedPassword);
        res.json({ message: "User was created" });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function login(req, res) {
    res.json({ message: "You was logged in"})
}

async function logout(req, res, next) {
    req.logout((err) => {
         if (err) {
            return next(err);
        }
        res.json({message: "You logged out"})
    });
}

module.exports = {
    signUp,
    login,
    logout
}