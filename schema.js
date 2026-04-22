// Schema for SSV (Server Side Validation) 
const joi = require('joi') ;

const product = joi.object({
    name : joi.string()
            .required()
            .min(3)
            .max(30) ,
    img : joi.string()
            .required() ,
    price : joi.number()
            .required()
            .min(0) ,
    desc : joi.string()
            .required()
})

const reviewSchema = joi.object({
    rating : joi.number()
                .min(0)
                .max(5)
                .required()
             ,
    comment : joi.string()
                .required() 
})

module.exports = {product, reviewSchema} ;