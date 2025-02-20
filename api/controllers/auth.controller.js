const User = require("../models/user");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error");

async function signup(req, res, next){
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ""){
        next(errorHandler(400, 'All fields are requried'));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password : hashedPassword,
    });

    try{
        await newUser.save();
        res.json({message : "User Created"});
    }
    catch(err){
        next(err);
    }
}

module.exports = signup;