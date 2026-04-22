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
    },
    reviews : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Review'
    }]
})


// MiddleWare : jo bts monogdb operation krwane pr use hota hein and uske andr pre and post middleware hota h . they are schema methods 
// used over the schema and before the model  

product.post('findOneAndDelete', async (item)=> {
    if(item.reviews.length > 0)
    {
        await Review.deleteMany({_id:{$in:item.reviews}}) ;
    }
}) 


let Product = mongoose.model('Product', product) ;
module.exports = Product ;