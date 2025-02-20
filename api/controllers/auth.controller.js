const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function signup(req, res){
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ""){
        return res.status(400).json({message : "All fields are required"});
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
        res.status(500).json({message: err.message});
    }
}

module.exports = signup;