const bcrypt = require("bcryptjs");
const db = require("../services/authQueries");
const { body, validationResult } = require("express-validator");

const validateSignUp = [
    body("firstName")
        .trim()
        .isLength({ min: 3, max: 10 }).withMessage("First name must be between 3 and 10 characters long"),
    body("lastName")
        .trim()
        .isLength({ min: 3, max: 10 }).withMessage("Last name must be between 3 and 10 characters long"),
    body("username")
        .trim()
        .isLength({ min: 3, max: 10 }).withMessage("Username must be between 3 and 10 characters long")
        .custom(async (username) => {
            const user = await db.getUserByName(username);
            if (user) {
                throw new Error("That name is already taken. please choose another.")
            }
        }),
    body("password")
        .trim()
        .isLength({ min: 5, max: 20 }).withMessage("Password must be between 5 and 20 characters long"),
    body("confPassword")
        .trim()
        .custom((value, { req }) => {
            if (!req.body.password) {
                throw new Error("Password field is required");
            }
            if (value !== req.body.password) {
                throw new Error("The passwords don't match.");
            }
            return true
        })
]

async function signUp(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.firstName, req.body.lastName, req.body.username, hashedPassword);
        res.json({ message: "User was created" });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function login(req, res) {
    res.json({ message: "You was logged in", user: req.user})
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
    logout,
    validateSignUp
}