const mongoose = require("mongoose")

async function connectToDb(url){
    try{
        await mongoose.connect(url);
    }
    catch(err){
        console.log("ERROR: " + err);
        process.exit(1);
    }
}

module.exports = connectToDb