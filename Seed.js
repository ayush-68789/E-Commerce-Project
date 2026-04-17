const mongoose = require('mongoose') ; 
const Product = require('./models/Product') ;

const products = [
    {
        name : "I-Phone 17 Pro Max", 
        img : "https://tse4.mm.bing.net/th/id/OIP.vn2SjpAekaNB8E5H0fHAjQHaHa?cb=thfc1&pid=ImgDet&w=184&h=184&c=7&o=7&rm=3" , 
        price : 149000,
        desc : "I phone by apple inc Made in California"
    },
    {
        name : "MacBook M3" ,
        img : "https://helios-i.mashable.com/imagery/articles/03kibYwewPMRMhCa3nQH72b/images-3.fill.size_2000x1125.v1709931126.jpg", 
        price : 300000,
        desc : "Macintosh by apple inc Made in California"
    },
    {
        name : "Jhadu",
        img : "https://c.shld.net/rpx/i/s/i/spin/image/spin_prod_819188912??hei=64&wid=64&qlt=50" ,
        price : 100,
        desc : "Mummy ke liye boht useful lagane ke liye bhi aur maarne ke liye bhi"
    } ,
    {
        name : "Pocha",
        img : "https://c.shld.net/rpx/i/s/i/spin/image/spin_prod_819188912??hei=64&wid=64&qlt=50" ,
        price : 300,
        desc : "Mummy ke liye boht useful lagane ke liye bhi aur maarne ke liye bhi"
    }
]

async function seedDB()
{
    await Product.insertMany(products) ;
    console.log('Data Added Successfully') ;
}

module.exports = seedDB ;