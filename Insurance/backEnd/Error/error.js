const express = require('express');
const error = express();



error.use('*',(error,req,res,next)=>{
    res.status(400).json({"success":false, "data": error.message});
});

module.exports=error;