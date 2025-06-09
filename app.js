require("dotenv").config();
require("./config/passport");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");
const userRouter = require("./routes/userRouter");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/ping", (req, res) => res.json({message: "Server is running"}))
app.use("/auth", authRouter)
app.use("/messages", messageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})