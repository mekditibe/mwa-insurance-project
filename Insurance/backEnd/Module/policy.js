const db= require('./db').db;

const mongoose = require('mongoose');

const policySchima= new db.Schema({
    service_Id:String, // Car-Id is 
    user:Object,
    car:Object,
    base_premium:Number,
    auto_premium:Number,
    load:Number,
    discount:Number,
    Policy_number:String,
    signed_date:String,
    expir_date:String,
    total_payment:Number
})

module.exports=mongoose.model('Policy',policySchima);