const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../../Module/user');

async function addUser(req, res, next){
    console.log("password  ................");

    try{
        let {fullname,username,password,age,gender,address} = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        const user= new User({
            "fullname":fullname,
            "username": username,
            "password": hash,
            "age":age,
            "gender": gender,
            "address": address
        });
        await user.save();
        res.json({"success":true, "data": user});
    }catch(error){
        return next(error);
    }
}

async function editUser(req, res, next){
    try{
        const owner = req.token._id.toString();
        let {fullname,username,password,age,gender,address} = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        const user={
            "fullname":fullname,
            "username": username,
            "password": hash,
            "age":age,
            "gender": gender,
            "address": address
        }
        await User.findByIdAndUpdate({_id:owner},user)
        res.json({"success":true, "data": owner});
    }catch(error){
        return next(error);
    }
}

async function getUsers(req,res,next){
    try {
        const users= await User.find({}).exec();
        res.json({"success":true, "data": users});
    } catch (error) {
        return next(error);
    }
   
}

async function getUser(req,res,next){
    try {
        const owner = req.token._id.toString();
        const user = await User.findById({_id:owner}).exec();
        res.json({"success":true, "data": user});
    } catch (error) {
        return next(error);
    }

}

async function deleteUser(req,res,next){
    try {
        const user_Id = req.token._id.toString();
        await User.findByIdAndDelete({_id:user_Id});
        res.json({"success":true, "data": user_Id});
    } catch (error) {
        return next(error);
    }
}

async function getUserFunc(owner){
    try {
        const user = await User.findById({_id:owner}).exec();
        return user;
    } catch (e) {
        return new Error(e);
    }

}

module.exports={addUser,editUser,getUsers,getUser,deleteUser, getUserFunc};

