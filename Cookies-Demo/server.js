const express = require('express') ; 
const app = express() ; 
const cookieParser = require('cookie-parser') ;

// app.use(cookieParser())  ;
app.use(cookieParser("ihaveabettersecret"))  ;

app.get('/', (req ,res) => {
    // res.send('Connected') ;
    console.log(req.cookies) ;
    // res.send(req.cookies) ;  all easy cookies
    res.send(req.signedCookies) ;  // all signed cookies
})

app.get('/getsignedCookie' , (req , res)=> {
    res.cookie('naam' , 'ayush_2007' , {signed : true }) ;  // return type is boolean by default false hota h ,, object mein true krna hota h 
    res.send(`cookie sent `) ; 
})

// app.get('/setcookie' ,(req, res)=> {
//     res.cookie('mode' , 'dark') ; 
//     res.cookie('user' , 'ayush_2007') ;
//     res.cookie('location' , 'Lucknow') ;
//     res.send('Server Sent you cookies') ;
// })

// app.get('/getcookie', (req , res) => {
//     let {mode , user, location } = req.cookies ;
//     res.send(`Name : ${user} , Location : ${location} , Mode : ${mode} `) ; 
// })

const port = 5050 ;
app.listen((port),() => {
    console.log(`Listening at port : ${port}`) ;
})