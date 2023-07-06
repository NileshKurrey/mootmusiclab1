const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../Utils/errorHandler");
const Artist = require('../models/UserModals/artistSchema')
const User = require('../models/UserModals/userSchema');


// create a Artist

exports.registerArtist = catchAsyncErrors(async (req, res, next) => {
    const { artistRole, country, phoneNo, about } = req.body
    if (!artistRole && !country && !phoneNo) {
        return next(new Errorhandler('Please Enter Full Data', 401))
    }
    const artist = await Artist.create({ artistRole, country, about, phoneNo, artistInfo: req.user.id })

    if (req.user.role === 'admin') {

        await User.findByIdAndUpdate(req.user.id, { isArtist: false, isAdmin: true, role: 'admin' })
        console.log(req.user.role)
    }
    if (req.user.role === 'artist') {

        return next(new Errorhandler('You Already logged in as Artist',401))
    }
    await User.findByIdAndUpdate(req.user.id, { isArtist: true, isAdmin: false, role: 'artist' })
    res.status(201).json({
        success: true,
        artist
    })
})

//Get single artist profile

exports.getArtistDetails = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id)
    const artist = await Artist.findById(req.params.id).populate("artistInfo",
        "name email avatar")
    if (!artist) {
        return next(new Errorhandler('Artist Not Found', 404))
    }
    res.status(200).json({
        success: true,
        artist
    })
    console.log(artist)
})

//Get All Artist -- Admin

exports.getAllArtist = catchAsyncErrors(async (req, res, next) => {
    const artists = await Artist.find().populate("artistInfo",
        "name email avatar")

    res.status(200).json({
        success: true,
        artists
    })
})

//Delete Artist -- Admin 

exports.delateArtist = catchAsyncErrors(async (req, res, next) => {
    const artist = await Artist.findById(req.params.id)
    if (!artist) {
        return next(new Errorhandler('Artist Not Found'), 404)
    }

    artist.deleteOne()
    await User.findByIdAndUpdate(req.user.id, { isArtist: false, role: 'User' })
    res.status(200).json({
        success: true,
    });
})

//update Artist && Admin

exports.updateArtist = catchAsyncErrors(async (req, res, next) => {
    let artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    if (!artist) {
        return next(new Errorhandler('Artist Not Found'), 404)
    }
    res.status(201).json({
        success: true,
        artist
    })
})

// artist Likes 

exports.likeAndUnlike = catchAsyncErrors(async (req, res, next) => {

    const artist = await Artist.findById(req.params.id)
    if (!artist) {
        return next(new Errorhandler('Artist Not Found', 404))
    }
    if (artist.likes.includes(req.user.id)) {
        const index = artist.likes.indexOf(req.user.id)
        artist.likes.splice(index, 1)
        await artist.save()
        return res.status(200).json({
            success: true,
            message: 'Unlike Artist'
        })
    }
    else {
        artist.likes.push(req.user.id)
        await artist.save()
        return res.status(200).json({
            success: true,
            message: 'Added To Liked Artist'
        })
    }
})

//get Most Liked Artists 

exports.mostLikedArtist = catchAsyncErrors(async (req, res, next) => {
    const artist = await Artist.find({}).populate("artistInfo",
    "name avatar").sort({likes:-1}).limit(25)

    console.log(artist)
    if (!artist) {
        return next(new Errorhandler('Artist Not Found'), 404)
    }

    res.status(201).json({
        success: true,
        artist
    })
})


//get Artist by Search