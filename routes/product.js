const express = require('express') ; 
const Product = require('../models/Product') ;
const router = express.Router() ; // mini instance

// to show all products
router.get('/products', async (req, res)=> {
    let products = await Product.find({}) ;
    res.render('products/index', {products}) ; 
})

// to show the form for new products
router.get('/products/new', (req, res)=> {
    res.render('products/new') ;
})


// to actually add the product
router.post('/products',async (req,res)=> {
    let {name , img , price , desc} = req.body ;
    await Product.create({name , img , price , desc}) ;
    res.redirect('/products')
})

// to show a particular product
router.get('/products/:id', async (req, res) => {
    let {id} = req.params ;
    let found = await Product.findById(id) ;
    res.render('products/show', {found}) ;
})

// to show a form to edit product with past values
router.get('/products/:id/edit', async (req, res)=> {
    let {id} = req.params ;
    let found =  await Product.findById(id) ;
    res.render('products/edit', {found}) ;
})

// to actually d=edit
router.patch('/products/:id' , async (req, res) => {
    let {id} = req.params ;
    let {name , img , price , desc} = req.body ;
    await Product.findByIdAndUpdate(id , {name , img , price , desc})
    res.redirect(`/products/${id}`) ;
})

// to delete
router.delete('/products/:id' , async (req, res) => {
    let {id} = req.params ;
    await Product.findByIdAndDelete(id) ;
    res.redirect(`/products`) ;
})
module.exports = router ;