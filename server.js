const express = require('express') ; 
const app = express() ; 
const path = require('path') ;
const mongoose = require('mongoose');
const seedDB = require('./Seed') ;

mongoose.connect('mongodb://127.0.0.1:27017/Shopping_App')
.then(()=> {
    console.log('DB CONNECTED SUCCESSFULLY') ; 
})
.catch((err) => {
    console.log(`DB NOT CONNECTED Error : ${err}`) ;
})
// views 
app.set('view engine', 'ejs') ; 
app.set('views', path.join(__dirname , 'views')) ;

// public
app.set(express.static(path.join(__dirname , 'public'))) ;

// Sededing DB
// seedDB();

const port = 5050 ;
app.listen((5050) , () => {
    console.log(`Server Running at Port : ${port}`) ;   
})