const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8005;

app.use(express.json());

mongoose.connect(process.env.URL)
.then(()=> console.log("Connected to Db"))
.catch((err) => {
    console.log(err);
})

app.listen(PORT, ()=> console.log(`Server is running at PORT ${PORT}!`));

const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route")

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);