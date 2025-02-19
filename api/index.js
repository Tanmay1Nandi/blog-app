const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8005;
app.listen(PORT, ()=> console.log(`Server is running at PORT ${PORT}!`));