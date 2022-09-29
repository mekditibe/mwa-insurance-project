const Policy = require('../../Module/policy');
const nodemailer = require('nodemailer');
discount = 2;

async function generatePolicy(car,user){

    const base_premium= getBase_premiumRule(car.type);
    const auto_premium = getAuto_premiumRule(car.year, car.price);
    const load = getLoadRule(user.age,user.gender);
    total_payment = load+auto_premium+discount+base_premium;
    const service_Id= car._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    const now = new Date();
    const nowYear= new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    const policy = new Policy({
        "service_Id":service_Id.toString(),  
        "user":user,
        "car":car,
        "base_premium":base_premium,
        "auto_premium":auto_premium,
        "load":load,
        "discount":discount,
        "Policy_number":"AKD"+ service_Id.slice(6)+"00MWA",
        "signed_date":now.toString(),
        "expir_date":nowYear.toString(),
        "total_payment":total_payment
    });
    const policy_Gen = await policy.save();
    emailSend(car,user,policy_Gen);
}

async function getPolicies(req,res,next){
    try {
        const owner = req.token._id.toString();
        const policys= await Policy.find({"car.owner":owner}).exec();
        res.json({"success":true, "data": policys});
    } catch (error) {
        return next(error);
    }
   
}

async function getPolicy(req,res,next){
    try {
        const {car_Id} = req.params;
        const owner = req.token._id.toString();
        const policy = await Policy.findOne({"car.owner":owner,"service_Id":car_Id}).exec();
        res.json({"success":true, "data": policy});
    } catch (error) {
        return next(error);
    }

}

async function deletePolicy(req,res,next){
    try {
        const {car_Id} = req.params;
        const owner = req.token._id.toString();
        await Policy.deleteOne({"owner":owner,"service_Id":car_Id});
        res.json({"success":true, "data": car_Id});
    } catch (error) {
        return next(error);
    }
}


const sendEmail= async function(username,subjectLine,plainText){
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: 'cinemahallmiu@outlook.com',
            pass: 'Cinema@miu123'
        }
    });

    const mailOptions = {
        from: 'cinemahallmiu@outlook.com', // sender address
        to: `${username}`, // list of receivers
        subject: `${subjectLine}`, // Subject line
        text: `${plainText}`, // plain text body

    }
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
        console.log('Message Sent' + info.response);
        transporter.close();
     });
}

function emailSend(car,user,policy_Gen){

    subjectLine = "Confirmed: Your Sucssesfuly Covered for Vehicle " + car.plate + " Plate Number";
    plainText = " Dear " + user.fullname + ",";
    startTime = new Date(policy_Gen.signed_date);
    endTime = new Date(policy_Gen.expir_date);
    dateOnlyStart = (startTime.getUTCFullYear()) + "/" + (startTime.getMonth() + 1)+ "/" + (startTime.getUTCDate());
    dateOnlyEnd = (endTime.getUTCFullYear()) + "/" + (endTime.getMonth() + 1)+ "/" + (endTime.getUTCDate());
    plainText += `\n\n We would like to inform you that, your insurance policy ${policy_Gen.Policy_number} has been generated.
    The vehicle ${car.vehicle_identification_number} with identification number are insured from ${dateOnlyStart} to ${dateOnlyEnd}. 
      \n Thank you for choosing MWA Insurance. Enjoy your time with MWA Insurance. `;

    // sendEmail(user.username,subjectLine,plainText);
}


function getBase_premiumRule(type){
    if(type == "Sport Vehicles") 
            base_premium=120;
    else if(type == "City Vehicles")
        base_premium = 85;
    else
        base_premium = 44;
    return base_premium;
}

function getAuto_premiumRule(year,price){

    if(year > 1980 && year < 1999) 
        auto_premium=190;
    else if(year > 1999 && year < 2015)
        auto_premium = 40;
    else if(year > 2015)
        auto_premium = 22;
    if(price > 2000 && price < 8000) 
        auto_premium +=29;
    else if(price > 8000 && price < 14000)
        auto_premium += 47;
    else if(price > 14000)
        auto_premium += 130;
    
    return auto_premium;
}


function getLoadRule(age,gender){

    if((age > 18 && age < 27) && (gender == "female")) 
        load=80;
    else if((age > 18 && age < 27) && (gender == "male"))
        load = 120;
    else if(age > 44)
        load = 22;
    if((age > 20 && age < 44) && (gender == "female")) 
        load =50;
    if((age > 20 && age < 44) && (gender == "male")) 
        load =85;
    else if(gender == "male")
        load = 48;
    else load = 30;
    
    return load;
}

module.exports={getPolicy,deletePolicy,getPolicies, getBase_premiumRule, generatePolicy};