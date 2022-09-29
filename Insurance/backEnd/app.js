
const express = require('express');
const morgan = require('morgan')
const fs = require('fs');
const path = require('path')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

const User = require('./Module/user');

const error = require('./Error/error');
const userRoutes = require('./Router/user/user');
const carRoutes = require('./Router/car/car');
const policyRoutes = require('./Router/policy/policy');
const validate = require('./Middleware/checkToken');
const {getUsers,addUser} = require('./Controller/user/user');


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev')); // for dev

app.use(cors());
app.use(express.json());

// To check a password:
// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });
// bcrypt.compareSync(myPlaintextPassword, hash); // true


app.post('/login', async (req,res,next)=>{
    try {
        const{username,password} = req.body;
        const user = await User.findOne({"username":username}).lean();
        if(bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({
                ...user,password:null
            },'SECRET_KEY');
            res.json({"success":true, "data": token});
        }else{
            throw new Error("Invalid Username or password!")
        }
    } catch (error) {
        next(error);
    }
});

app.get('/admin/users',getUsers);
app.post('/sinup',addUser);
app.use('*',validate);
app.use('/cars',carRoutes); 
app.use('/policies',policyRoutes); //policies
app.use('/users',userRoutes); 
app.use(error);
// app.use(error);

app.listen(3000, ()=>{ console.log("Listening to port 3000")});


