const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../Utils/errorHandler");
const User = require('../models/UserModals/userSchema');
const sendToken = require("../Utils/jwttoken");
const sendEmail = require('../Utils/sendEmail')

//register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {



  const { name, email, password,avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
    isAdmin:false,
    isAdertiser:false,
    isArtist:false
  });
  
  //JWT Token
  sendToken(user,201,res)
});

//Login User

exports.loginUser =catchAsyncErrors(async (req,res,next)=>{
  const {email, password} = req.body
  //checking if user has givern passwor and email both 
 
  if(!email || !password){
    return next(new Errorhandler('Please Enter Email & Password',400));
  }

  const user = await User.findOne({email}).select('+password')

  if(!user){
    return next(new Errorhandler("Invalid email or Password",401))
  }

  const isPasswordMatched = await user.comparePassword(password);


  if(!isPasswordMatched){
    return next(new Errorhandler("Invalid email or Password",401))
  }
 //JWT Token
  sendToken(user,200,res)

})

//Logout user

exports.logout = catchAsyncErrors(async (req,res,next)=>{
  
  res.cookie('token',null,{
    expires: new Date(Date.now()),
    httpOnly:true
  })

  res.status(200).json({
    success:true,
    message:'User Logged Out Successfully'
  })
  
})


// Forget Password

exports.forgetPassword = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findOne({email:req.body.email})

  if(!user){
    return next(new Errorhandler('User not found',400));

  }
  // Get ResetPasswordToken

 const resetToken = user.getResetPasswordToken();
 
 await user.save({validateBeforeSave:false});

 const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

 const message = `Your Password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not requested this email then, please ignore it`;

  try {
    await sendEmail({
      email:user.email,
      subject:'Demo Login Password Recovery',
      message,
    });

    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} succesfully`
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({validateBeforeSave:false});

    return next(new Errorhandler(error.message,500))
  }
})

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});


// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }


  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});