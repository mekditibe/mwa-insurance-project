const db= require('./db').db;
const mongoose = require('mongoose');

// db.users.insertOne({"fullname":"Mekdes Teffera", "username":"mekdi@gmail.com", "password":"1234", "age":27, "gender":"female",
//  "address":{"city":"Fairfield","state":"Iowa", “zipcode”:”52557”, “street”:”1000 N 4th Street”}}

const userSchima= new db.Schema({
    fullname:String,
    username:String,
    password:String,
    age:Number,
    gender:String,
    address:Object,
})

module.exports=mongoose.model('User',userSchima);