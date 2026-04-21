const express = require('express') ; 
const mongoose = require('mongoose') ;
const Product = require('../models/Product');
const Review = require('../models/Review') ;
const router = express.Router() ; 

router.post('/products/:id/review', async (req , res)=> {
    // console.log(req.body) ; 
    let {rating , comment} = req.body ;
    let {id} = req.params ;
    const product = await Product.findById(id) ;

    const review = new Review({rating ,comment}) ;

    product.reviews.push(review) ;   // product ke andr reviews array mein daaldo
    await review.save() ; // Store in DB
    await product.save() ;  // Store in DB

    res.redirect(`/products/${id}`) ;
})

module.exports = router ;