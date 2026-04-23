const express = require('express') ; 
const Product = require('../models/Product') ;
const Review = require('../models/Review') ;
const router = express.Router() ; // mini instance

const {validateProduct} = require('../middleware') ;  // SSV
const {isLoggedIn} = require('../middleware') ; // check Authentication

// to show all products
router.get('/products',isLoggedIn ,async (req, res)=> {
    try{
        let products = await Product.find({}) ;
        res.render('products/index', {products}) ; 
    }
    catch(err) {
        res.status(500).render('error', {err}) ;
    }
})

// to show the form for new products
router.get('/products/new',isLoggedIn, (req, res)=> {
    try{
        res.render('products/new') ;
    }
    catch(err) {
        res.status(500).render('error', {err }) ;
    }
})


// to actually add the product
router.post('/products',isLoggedIn, validateProduct , async (req,res)=> {
    try{
        let {name , img , price , desc} = req.body ;
        await Product.create({name , img , price , desc}) ;
        req.flash('success' ,'Product Added Succesfully') ;
        res.redirect('/products');
    }
    catch(err) {
        res.status(500).render('error', {err}) ;
    }
})

// to show a particular product
router.get('/products/:id',isLoggedIn, async (req, res) => {
    try{
        let {id} = req.params ;
        let found = await Product.findById(id).populate('reviews') ;
        res.render('products/show', {found, msg : req.flash('msg')}) ;
    }
    catch(err) {
        res.status(500).render('error', {err}) ;
    }
})

// to show a form to edit product with past values
router.get('/products/:id/edit',isLoggedIn,  async (req, res)=> {
    try{
        let {id} = req.params ;
        let found =  await Product.findById(id) ;
        res.render('products/edit', {found}) ;
    }
    catch(err) {
        res.status(500).render('error', {err }) ;
    }
})

// to actually edit
router.patch('/products/:id' ,isLoggedIn,validateProduct ,async (req, res) => {
    try{
        let {id} = req.params ;
        let {name , img , price , desc} = req.body ;
        await Product.findByIdAndUpdate(id , {name , img , price , desc}) ;
        req.flash('success' ,'Product Edited Succesfully') ;
        res.redirect(`/products/${id}`) ;
    }
    catch(err) {
        res.status(500).render('error', {err}) ;
    }
})

// to delete
router.delete('/products/:id' ,isLoggedIn, async (req, res) => {
    try{
        let {id} = req.params ;
        let product = await Product.findById(id);
        // for(let item of product.reviews)
        // {
        //     await Review.findByIdAndDelete(item) ;
        // }
        await Product.findByIdAndDelete(id) ;
        req.flash('success' ,'Product Deleted Succesfully') ;

        res.redirect(`/products`) ;
    }
    catch(err) {
        res.status(500).render('error', {err }) ;
    }
})
module.exports = router ;