const {product , reviewSchema} = require('./schema') ;

const validateProduct = (req, res, next) => {
    let {name , img , price , desc} = req.body ;
    const {err} = product.validate({name , img , price , desc}) ;
    if(err )
    {
        return res.render('error', {err}) ;
    }
    next() ;
}

const validateReview = (req, res, next)=> {
    let {rating , comment}= req.body ;
    const {error } = reviewSchema.validate({rating, comment}) ;
    if(error )
    {
        return res.render('error') ;
    }
    next() ;
}

module.exports = {validateProduct , validateReview} ;
