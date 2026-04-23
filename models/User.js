const mongoose = require('mongoose') ;
const plm = require('passport-local-mongoose');
const passportLocalMongoose = plm.default || plm;
// plm se user aur pass automatically bn jata h to schema mein bs username aur pass ko chod kr hi schema add krenge
const userSchema = new mongoose.Schema({
    email : {
        type : String , 
        required : true , 
        trim : true 
    } // username aur pass nhi bnaega  pehle se bn jaata h PLM se 
})
// schema ke baad model ke pehle 
userSchema.plugin(passportLocalMongoose) ;  // jis var name se require kiya th same use kro ... this plugin is responsible for letting the use of passport startegies

const User = mongoose.model('User', userSchema) ;
module.exports = User ;