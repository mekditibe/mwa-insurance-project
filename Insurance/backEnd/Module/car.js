const db= require('./db').db;
const mongoose = require('mongoose');

const carSchima= new db.Schema({
    owner:String,
    plate:String,
    vehicle_identification_number:String,
    year:Number,
    driving_licence:String,
    type:Object,
    price:Number
})

module.exports=mongoose.model('Car',carSchima);