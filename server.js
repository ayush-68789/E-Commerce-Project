const express = require('express') ; 
const app = express() ; 
const path = require('path') ;
const mongoose = require('mongoose');
const seedDB = require('./Seed') ;
const productRoutes = require('./routes/product') ;
const reviewRoutes = require('./routes/review') ;
const methodoverride = require('method-override') ;
const flash = require('connect-flash') ;
const session = require('express-session') ;

const ejsMate = require('ejs-mate') ;

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

// flash 
app.use(flash()) ;

app.use((req, res , next) => {
    res.locals.success = req.flash('Success') ; 
    res.locals.error = req.flash('error') ;
    next() ;
})

//session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
}))
// Sededing DB
// seedDB();

app.use(productRoutes) ; // har incoming req ke liye path check kiya jaye
app.use(reviewRoutes) ;

const port = 5050 ;
app.listen((5050) , () => {
    console.log(`Server Running at Port : ${port}`) ;   
})