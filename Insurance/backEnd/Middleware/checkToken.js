const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    if(req.get('authorization')){
        try {
            const token = req.get('authorization')?.split(' ')[1]; //MWA 0000
            let verifyedToken= jwt.verify(token,'SECRET_KEY');
            if(!verifyedToken) throw new Error("Invalid token!!");
            req.token = verifyedToken;
            next();
        } catch (error) {
            next(error);
        }
    }else{
        next(new Error("No token found!!"));
    }  
}