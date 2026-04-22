const express = require('express'); 
const app =express() ;
const session = require('express-session') ;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
}))

app.get('/', (req ,res)=> {
    res.send('Session mien swagat h') ;
})

app.get('/viewcount' , (req ,res) => {
    if(req.session.count){
        req.session.count++  ;
    }
    else{
        req.session.count = 1 ;
    }
    res.send(`You Visted the site ${req.session.count} Times`) ;
})


app.get('/setname' , (req ,res)=> {
    req.session.username = "Ayush_2007" ; 
    res.redirect('/greet') ; 
})

app.get('/greet' , (req ,res) => {
    let {username = 'anonymous'} = req.session ;
    res.send(`Hi From ${username}`) ; 
})
// app.get('/setname' , (req ,res) => {

// })

const port = 5050 ; 
app.listen((port) , (req ,res) => {
    console.log(`Listening at port : ${port}`) ;
})