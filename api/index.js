const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8005;


//connect to Database
// const connectToDb = require("./connection")
// connectToDb("mongodb://127.0.0.1:27017/BlogApp")
// .then(()=> console.log("Connected to Db!"))
// .catch((err) => console.log("Couldn't connect due to" + err));

mongoose.connect(process.env.URL)
.then(()=> console.log("Connected to Db"))
.catch((err) => {
    console.log(err);
})

app.listen(PORT, ()=> console.log(`Server is running at PORT ${PORT}!`));