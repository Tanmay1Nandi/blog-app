const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken")

async function signup(req, res, next){
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ""){
        next(errorHandler(400, 'All fields are requried'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

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


async function signin(req, res, next){
    const{ email, password } = req.body;
    if(!email || !password || email === "" || password === ""){
        next(errorHandler(400, "All fields are required"));
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "Password or email not correct"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(404, "Password or email not correct"));
        }
        const token = jwt.sign(
            {id: validUser._id}, process.env.JWT_SECRET, {expiresIn: "10d"}
        )
        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token,{
            httpOnly: true
        }).json(rest);
    }catch(err){
        next(err);
    }
}


module.exports = {
    signin,
    signup
};