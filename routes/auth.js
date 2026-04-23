const express = require('express') ; 
const router = express.Router() ; 
const User = require('../models/User') ; 
const passport = require('passport') ;
// to show the form of signup
router.get('/register', (req ,res) => {
    res.render('auth/signup') ;
})

// to actually register a user in DB
router.post('/register' , async (req ,res) => {
    let {username ,email, password } = req.body ;
    const user = new User({username, email }) ;
    const newUser = await User.register(user , password);
    // res.send(newUser) ;
    res.redirect('/login') ;
})

router.get('/login' , (req, res) => {
    res.render('auth/login') ;
})

router.post('/login' , passport.authenticate('local', {failureRedirect : '/login' , failureFlash : true , failureMessage : true}) , (req, res)=> {
    req.flash('success' , 'Welcome back!') ;
    res.redirect('/products') ;
}) ;

router.get('/logout' , (req, res)=> {
    ()=>{
        req.logout() ;
    }
    req.flash('success', 'You Logged out of your account')
    res.redirect('/login') ;
})

module.exports = router ;