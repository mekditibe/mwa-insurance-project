const Car = require('../../Module/car');
const Policy = require('../../Module/policy');
const User = require('../../Module/user');
const {generatePolicy}= require('../policy/policy');
const {getUserFunc}= require('../user/user');

async function addCar(req, res, next){
    try{
        console.log("back end...", req.body);
        let {plate,vehicle_identification_number,year,driving_licence,type,price} = req.body;
        const owner = req.token._id.toString();
        const car= new Car({
            "owner":owner,
            "plate":plate,
            "vehicle_identification_number":vehicle_identification_number,
            "year":year,
            "driving_licence":driving_licence,
            "type":type,
            "price":price

        });
        const result = await car.save();
        const user= await getUserFunc(owner);
        const policyGen= generatePolicy(result,user);
        res.json({"success":true, "data": result});
    }catch(error){
        return next(error);
    }
}

async function editCar(req, res, next){
    try{
        const {car_Id} = req.params;
        const owner = req.token._id.toString();
        const result = await Car.findByIdAndUpdate({_id:car_Id},req.body);
        const carGet = await Car.findOne({"owner":owner}).exec();
        const user= await getUserFunc(owner);
        const policyGen= generatePolicy(carGet,user);
        const p= await Policy.deleteOne({"service_Id":car_Id});
        res.json({"success":true, "data": car_Id});
    }catch(error){
        return next(error);
    }
}

async function getCars(req,res,next){
    try {
        const owner = req.token._id.toString();
        const result = await Car.find({"owner":owner}).exec();
        res.json({"success":true, "data": result});
    } catch (error) {
        return next(error);
    }
   
}

async function getCar(req,res,next){
    try {
        const {car_Id} = req.params;
        const result = await Car.findById(car_Id).exec();
        res.json({"success":true, "data": result});
    } catch (error) {
        return next(error);
    }

}

async function deleteCar(req,res,next){
    try {
        const {car_Id} = req.params;
        const result = await Car.findByIdAndDelete({_id:car_Id});
        const p= await Policy.deleteOne({"service_Id":car_Id});
        res.json({"success":true, "data": car_Id});
    } catch (error) {
        return next(error);
    }
}

module.exports={getCars,addCar,getCar,editCar,deleteCar};

