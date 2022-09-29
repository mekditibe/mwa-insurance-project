const express= require('express');
const policy = express.Router();
const {getPolicy,deletePolicy,getPolicies} = require('../../Controller/policy/policy');



policy.get('/',getPolicies);
policy.get('/:car_Id',getPolicy);
policy.delete('/:car_Id',deletePolicy);




module.exports=policy;