const Errorhandler = require('../Utils/errorHandler')

module.exports = (err, req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
//Wrong MongoDB Id error
if(err.name === 'CastError'){
    const message =   `Resource not found. Invalid:${err.path}`;
    err = new Errorhandler(message,400);
    console.log(err)
}    
    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    }); 
};