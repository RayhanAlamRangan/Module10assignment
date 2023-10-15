

const express=require('express');

const studentController=require('../Controllers/StudenController');
const taskController=require('../Controllers/TaskController');
const AuthverifyMiddleware=require('../Middleware/AuthVerifyMiddleware');

const router=express.Router();

// Student Manage
router.post('/registration', studentController.registration);
router.post('/login',studentController.login);
router.post('/profileupdate',AuthverifyMiddleware,studentController.profileUpdate);
router.get('/profiledetails',AuthverifyMiddleware,studentController.profileDetails);




router.get('/RecoverVerifyEmail/:email',AuthverifyMiddleware,studentController.RecoverVerifyEmail);
router.get('/RecoverVerifyOtp/:email/:otp',AuthverifyMiddleware, studentController.RecoverVerifyOTP);
router.post('/RecoverResetPass/', studentController.RecoverResetPass);
