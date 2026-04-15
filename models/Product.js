const mongoose = require("mongoose");

const product = new mongoose.Schema({
    name : {
        type : String , 
        trim : true ,
        required : true 
    } , 
    img : {
        type : String ,
        trim : true , 
        // default :
    }, 
    price : {
        type : Number , 
        min : 0 ,
        required : true 
    } ,
    desc : {
        type : String, 
        trim : true 
    }
})

let Product = mongoose.model('Product', product) ;
module.exports = Product ;