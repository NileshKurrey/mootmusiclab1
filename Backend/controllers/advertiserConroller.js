const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../Utils/errorHandler");
const Advertiser = require('../models/UserModals/advertiserSchema')
const User = require('../models/UserModals/userSchema');


//create a adevertiser

exports.registerAdvertiser = catchAsyncErrors(async (req, res, next) => {
    const { AdvertiserRole, country, phoneNo, about } = req.body
    if (!AdvertiserRole && !country && !phoneNo) {
        return next(new Errorhandler('Please Enter Full Data', 401))
    }
    const advertiser = await Advertiser.create({ AdvertiserRole, country, about, phoneNo, AdvertiserInfo: req.user.id })

    if (req.user.role === 'admin') {

        await User.findByIdAndUpdate(req.user.id, { isAdvertiser: false, isAdmin: true, role: 'admin' })
        console.log(req.user.role)
    }
    if (req.user.role === 'Advertiser') {

        return next(new Errorhandler('You Already logged in as Advertiser',401))
    }
    await User.findByIdAndUpdate(req.user.id, { isAdvertiser: true, isAdmin: false, role: 'Advertiser' })
    res.status(201).json({
        success: true,
        advertiser
    })
})

//get Single Adertiser

exports.getAdvertiserDetails = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id)
    const advertiser = await Advertiser.findById(req.params.id).populate("AdvertiserInfo",
        "name email avatar")
    if (!Advertiser) {
        return next(new Errorhandler('Advertiser Not Found', 404))
    }
    res.status(200).json({
        success: true,
        advertiser
    })
    console.log(Advertiser)
})

//Get All Advertiser -- Admin

exports.getAllAdvertiser = catchAsyncErrors(async (req, res, next) => {
    const Advertisers = await Advertiser.find().populate("AdvertiserInfo",
        "name email")

    res.status(200).json({
        success: true,
        Advertisers
    })
})

//Delete Advertiser -- Admin 

exports.delateAdvertiser = catchAsyncErrors(async (req, res, next) => {
    const Advertiser = await Advertiser.findById(req.params.id)
    if (!Advertiser) {
        return next(new Errorhandler('Advertiser Not Found'), 404)
    }

    Advertiser.deleteOne()
    await User.findByIdAndUpdate(req.user.id, { isAdvertiser: false, role: 'User' })
    res.status(200).json({
        success: true,
    });
})

//update Advertiser && Admin

exports.updateAdvertiser = catchAsyncErrors(async (req, res, next) => {
    let advertiser = await Advertiser.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    if (!Advertiser) {
        return next(new Errorhandler('Advertiser Not Found'), 404)
    }
    res.status(201).json({
        success: true,
        advertiser
    })
})


//Send Proposals 

// exports.sendProposals = catchAsyncErrors(async (req,res,next)=>{
//     const msg = req.body

// })