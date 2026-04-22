const express = require('express') ; 
const mongoose = require('mongoose') ;
const Product = require('../models/Product');
const Review = require('../models/Review') ;
const router = express.Router() ; 

const {validateReview} = require('../middleware') ;  // SSV

router.post('/products/:id/review', validateReview , async (req , res)=> {
    try{
        // console.log(req.body) ; 
        let {rating , comment} = req.body ;
        let {id} = req.params ;
        const product = await Product.findById(id) ;
    
        const review = new Review({rating ,comment}) ;
    
        product.reviews.push(review) ;   // product ke andr reviews array mein daaldo
        await review.save() ; // Store in DB
        await product.save() ;  // Store in DB
        
        req.flash('success' ,'Review Added Succesfully') ;
        res.redirect(`/products/${id}`) ;
    }
    catch (err)
    {
        res.status(500).render('error', {err}) ;
    }
})

module.exports = router ;