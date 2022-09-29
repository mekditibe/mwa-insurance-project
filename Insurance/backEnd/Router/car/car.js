const express= require('express');
const car = express.Router();
const {getCars,addCar,getCar,editCar,deleteCar} = require('../../Controller/car/car');
const {getPolicy} = require('../../Controller/policy/policy');



car.get('/',getCars);
car.post('/',addCar);
car.get('/:car_Id',getCar);
car.put('/:car_Id',editCar);
car.delete('/:car_Id',deleteCar);
car.get('/:car_Id/policy',getPolicy);

module.exports=car;