

const StudentModel=require('../Models/StudentModels');
const jwt=require('jsonwebtoken');
const OTPModel=require('../Models/OTPModels');
const AuthVerify=require('../Utility/SendEmailUtility');

exports.registration= async (req,res)=>{

    let reqBody=req.body
try{

   let result=  await StudentModel.create(reqBody);
   res.status(200).json({status:"Success To Recieve Data", data:result})

}

catch(e){
res.status(200).json({status:"Fail To Recieve Data",data: e})

}



}

exports.login=async(req,res)=>{
     try{
    let reqBody=req.body

    let result=await StudentModel.find(reqBody).count();

      if (result===1){

        // Login Success


        // Create Token


        let Playload= {exp:Math.floor(Date.now()/1000)+(24*60*60),
        data:reqBody['email']

      }

    let token=jwt.sign(Playload, "SecretKey123456789")

    res.status(200).json({status:"Success", data:token});

    }else{


        // Login Fail

        res.status(200).json({status:"Fail", data:"No User Found"});
    }


}

catch(e){

    res.status(200).json({status:"Fail", data:e});
}
   




}
exports.profileDetails=async(req,res)=>{

    try{
    
    let email= req.headers.email['email'];
    let result=await StudentModel.find({email:email});
    res.status(200).json({status:"Success", data:token});
    }catch(e){
    
        res.status(200).json({status:"Fail", data:e});
    }
    
    }


exports.profileUpdate=async(req,res)=>{

try{



    let email=req.headers['email']
let reqBody=req.body

let result=await StudentModel.updateOne({email:email},reqBody);

res.status(200).json({status:"Success",data:result})
}catch(e){

res.status(200).json({status:"Fail",data:e})

}


}



exports.RecoverVerifyEmail=async(req,res)=>{

let email=req.params.email 
let OTPCode= Math.floor(100000+ Math.random() *900000);
let EmailText= "Successfully Your Verification Code is ="+Otpcode
let EmailSubject="Task Manager verification Code"
let result= await StudentModel.find({email:email});



if(result===1){
//  



await  SendEmailUtility(email,EmailText,EmailSubject);
await OTPModel.create({email:email,otp:Otpcode});
res.status(200).json({status:"Success",data:" 6 digit code verification code send"})
}

else{
    res.status(200).json({status:"Fail",data: "No User Found"})

}

}


exports.RecoverVerifyOTP=async(req,res)=>{

    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;
    try {
        let OTPCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: status}}, {$count: "total"}])
        if (OTPCount.length>0) {
            let OTPUpdate = await OTPModel.updateOne({email: email, otp: OTPCode, status: status}, {
                email: email,
                otp: OTPCode,
                status: statusUpdate
            })
            res.status(200).json({status: "success", data: OTPUpdate})
        } else {
            res.status(200).json({status: "fail", data: "Invalid OTP Code"})
        }
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
    
}


exports.RecoverResetPass=(req,res)=>{


    
}