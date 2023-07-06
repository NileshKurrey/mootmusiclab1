
const Errorhandler = require('../Utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const User = require('../models/UserModals/userSchema')
const jwt = require('jsonwebtoken')

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Errorhandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});



exports.authorizeRoles = (...roles) =>{
return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new Errorhandler(`Role:${roles} is not allowed to access this resource`));
    }

    next()
}
};