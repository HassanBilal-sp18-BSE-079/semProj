const mongoose= require("mongoose");
const joi = require('@hapi/joi');
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    city:String,
    location:String,
    detail:String,
});

let Product= mongoose.model("Products",productSchema);

function validationSchema(data){
    const schema = joi.object({
        name:joi.string().min(3).max(30).required(),
    price:joi.number().min(4).required(),
    city:joi.string().min(3).required(),
    location:joi.string().min(3).required(),
    detail:joi.string(),
    })
    return schema.validate(data);

}



module.exports.Product= Product;
module.exports.validate= validationSchema;