const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your Name'],
        maxLength: [30, 'Name cannot exceed 30 Characters'],
        minLength: [4, 'Name should have More the 4 Characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validte: [validator.isEmail, 'Please Enter Valid Email']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password Should be greater Than 8 charaters'],
        select: false
    },

    avatar: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: 'admin'
    },
    isAdmin: {
        type: Boolean,
        defualt:true,
        required: true,
    },
    isArtist:{
        type:Boolean,
        defualt:false,
        required: true,
    },
    isAdertiser:{
        type:Boolean,
        defualt:false,
        required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)

});

//JWT Token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
};

//compare Password 

userSchema.methods.comparePassword = async function (enterdPassowrd) {
    return await bcrypt.compare(enterdPassowrd, this.password)
};

//Gennerting Password Reset Token

userSchema.methods.getResetPasswordToken = function () {
    //Gennerting Token 
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashing and add to userSchema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}
module.exports = mongoose.model('User', userSchema)