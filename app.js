require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})