require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const passport = require("./config/passport");
const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");
app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        },
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdFunction: undefined,
                dbRecordIdIsSessionId: true
            }
        )
    })
)

app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter)
app.use("/message", messageRouter);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})