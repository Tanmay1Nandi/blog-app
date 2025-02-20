const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8005;

//Default Middleware
app.use(express.json());


//Connecting to Database
mongoose.connect(process.env.URL)
.then(()=> console.log("Connected to Db"))
.catch((err) => {
    console.log(err);
})

app.listen(PORT, ()=> console.log(`Server is running at PORT ${PORT}!`));


//Routes
const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route")

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//Error Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});