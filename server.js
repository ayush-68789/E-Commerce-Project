const express = require('express') ; 
const app = express() ; 
const path = require('path') ;
const mongoose = require('mongoose');
const seedDB = require('./Seed') ;
const methodoverride = require('method-override') ;
const flash = require('connect-flash') ;
const session = require('express-session') ;
const passport = require('passport') ; 
const localStrategy = require('passport-local'); 
const User = require('./models/User') ;

const ejsMate = require('ejs-mate') ;

const productRoutes = require('./routes/product') ;
const reviewRoutes = require('./routes/review') ;
const authRoutes = require('./routes/auth') ;

mongoose.connect('mongodb://127.0.0.1:27017/Shopping_App')
.then(()=> {
    console.log('DB CONNECTED SUCCESSFULLY') ; 
})
.catch((err) => {
    console.log(`DB NOT CONNECTED Error : ${err}`) ;
})
// views 
app.engine('ejs', ejsMate) ;
app.set('view engine', 'ejs') ; 
app.set('views', path.join(__dirname , 'views')) ;

// public
app.use(express.static(path.join(__dirname , 'public'))) ;

// for fetching req body
app.use(express.urlencoded({extended:true})) ;

// for method-Overriding
app.use(methodoverride('_method')) ;

//session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
}))
// flash 
app.use(flash()) ;


app.use(passport.initialize()) ;
app.use(passport.session()) ;
// PASSPORT
passport.use(new localStrategy(User.authenticate())) ;
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;

app.use((req, res , next) => {
    res.locals.currentUser = req.user ;
    res.locals.success = req.flash('success') ; 
    res.locals.error = req.flash('error') ;
    next() ;
})
// Sededing DB
// seedDB();

app.use(productRoutes) ; // har incoming req ke liye path check kiya jaye
app.use(reviewRoutes) ;
app.use(authRoutes) ;

const port = 5050 ;
app.listen((5050) , () => {
    console.log(`Server Running at Port : ${port}`) ;   
})