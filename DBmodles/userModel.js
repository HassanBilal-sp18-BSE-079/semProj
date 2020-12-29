let mongoose = require("mongoose");


let userModel = mongoose.model('User',mongoose.Schema({
    name:String,
    email:String,
    password:String,
}));


module.exports = userModel;