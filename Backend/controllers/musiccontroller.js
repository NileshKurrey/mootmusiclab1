const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../Utils/errorHandler");
const Songs = require('../models/SongModals/songsSchema')
const Genre = require('../models/SongModals/genreSchema')
const Album = require('../models/SongModals/AlbumSchema')


//create a Song
exports.createSong = catchAsyncErrors(async(req,res,next)=>{
    const {songName , thumbnail , songUrl,artistList,genre } = req.body
  
     if(!songName && !thumbnail && !songUrl && !artistList && !genre ){
         return next(new Errorhandler('Enter Song details',400))
        }
        const song = await Songs.create({
            songName , thumbnail , songUrl,createdby:req.user.id,createdAt:Date.now()
        })
        artistList.forEach(()=>(
            song.artistList.push(artistList[0].artistInfo._id)
        ))
        genre.forEach(()=>(
            song.genre.push(genre[0]._id)
        ))
     song.save()
    res.status(201).json({
        success:true,
        song
    })
})
//Create a Genre -- Admin
exports.createGenre = catchAsyncErrors(async(req,res,next)=>{
    const {genreName} = req.body
    if(!genreName){
        return next(new Errorhandler('Enter Genre Name',400))
    }
    const genre = await Genre.create({genreName})
    if(genreName == genre.genreName){
        return next(new Errorhandler('This Genre Already Included',406))
    }
    res.status(201).json({
        success:true,
        genre
    })
})
//create a Album
exports.createAlbum = catchAsyncErrors(async(req,res,next)=>{
    const {albumName ,thumbnail} = req.body
    const songs =['642681bc1df3c14dd2ce3efd']
    if(!albumName && !thumbnail && !songs){
        return next(new Errorhandler('Enter Album details',400))
    }
    const album = await Album.create({albumName,thumbnail,createdby:req.user.id,songs})
    res.status(201).json({
        success:true,
        album
    })
})
//Update a Song
exports.updateSong = catchAsyncErrors(async(req,res,next)=>{
    let song = await Songs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    if (!song) {
        return next(new Errorhandler('Song Not Found'), 404)
    }
    res.status(200).json({
        success: true,
        song
    })
})
//Update a Album
exports.updateAlbum = catchAsyncErrors(async(req,res,next)=>{
    let album = await Album.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    if (!album) {
        return next(new Errorhandler('Album Not Found'), 404)
    }
    res.status(201).json({
        success: true,
        album
    })
})

//Get all Songs -- admin

exports.getAllSongs = catchAsyncErrors(async(req,res,next)=>{
    const song = await Songs.find({}).populate('artistList','name avatar').populate('genre','genreName').populate('createdBy','name email avatar')

    if(!song){
        return next(new Errorhandler('Nothing to show here',204))
    }
    res.status(200).json({
        success:true,
        song
    })
})
//Get My Songs -- user
exports.getAllMySongs = catchAsyncErrors(async(req,res,next)=>{
    const song = await Songs.find({createdby:req.user.id}).populate('artistList','name avatar').populate('genre','genreName').populate('createdBy','name email avatar')

    if(!song){
        return next(new Errorhandler('No song find with this user',404))
    }
    res.status(200).json({
        success:true,
        song
    })
})
//Get all Albums -- admin
exports.getAllAlbums = catchAsyncErrors(async(req,res,next)=>{
    const album = await Album.find()

    if(!album){
        return next(new Errorhandler('Nothing to show here',204))
    }
    res.status(200).json({
        success:true,
        album
    })
})
//Get My Albums -- user
exports.getAllmyAlbums = catchAsyncErrors(async(req,res,next)=>{
    const album = await Album.find({createdby:req.user.id})

    if(!album){
        return next(new Errorhandler('No album find with this user',404))
    }
    res.status(200).json({
        success:true,
        album
    })
})
//get All Genre
exports.getAllGenre = catchAsyncErrors(async(req,res,next)=>{
    const genre = await Genre.find()

    if(!genre){
        return next(new Errorhandler('Nothing to show here',204))
    }
    res.status(200).json({
        success:true,
        genre
    })
})
//get songs by Genre
exports.getSongsbyGenre = catchAsyncErrors(async(req,res,next)=>{
    console.log(req.params.id)
    const song = await Songs.find({genre:{$elemMatch:{$eq:req.params.id}}}).populate('artistList','name avatar').populate('genre','genreName').populate('createdBy','name email avatar')
    console.log(song)
    if(!song){
        return next(new Errorhandler('No song has found with this is genre',204))
    }
    else{

        res.status(200).json({
            success:true,
            song
        })
    }
})

//delete song -- admin
exports.deleteSongAdmin =catchAsyncErrors(async(req,res,next)=>{
    const song = await Songs.findById(req.params.id)
    if(!song){
        return next(new Errorhandler('Song Not found',404))
    }
    song.deleteOne()
    res.status(200).json({
        success: true,
        msg:'song deleted successfully'
    });
})
//delete song -- user
exports.deleteSong=catchAsyncErrors(async(req,res,next)=>{
    const song = await Songs.findById(req.params.id)
    if(!song){
        return next(new Errorhandler('Song Not found',404))
    }
    if(!song.createdby.equals(req.user.id)){
        next(new Errorhandler("you can't delate this song",401))
    }
    song.deleteOne()
    res.status(200).json({
        success: true,
        msg:'song deleted successfully'
    });
})
//delete genre -- admin
exports.deleteGenre =catchAsyncErrors(async(req,res,next)=>{
    const genre = await Genre.findById(req.params.id)
    if(!genre){
        return next(new Errorhandler('Song Not found',404))
    }
    genre.deleteOne()
    res.status(200).json({
        success: true,
        msg:'genre deleted successfully'
    });
})
//delete Album -- admin
exports.deleteAlbumByAdmin =catchAsyncErrors(async(req,res,next)=>{
    const album = await Album.findById(req.params.id)
    if(!album){
        return next(new Errorhandler('Song Not found',404))
    }
    if(!album.createdby.equals(req.user.id)){
        next(new Errorhandler("you can't delate this album",401))
    }
    album.deleteOne()
    res.status(200).json({
        success: true,
        msg:'album deleted successfully'
    });
})
//delete Album -- user
exports.deleteAlbum =catchAsyncErrors(async(req,res,next)=>{
    const album = await Album.findById(req.params.id)
    if(!album){
        return next(new Errorhandler('Song Not found',404))
    }
    album.deleteOne()
    res.status(200).json({
        success: true,
        msg:'album deleted successfully'
    });
})
//remove song of Album 

exports.removeSong = catchAsyncErrors(async(req,res,next)=>{
    const album = await Album.findById(req.params.id)
    if (!album) {
        return next(new Errorhandler('album Not Found', 404))
    }
    if(!album.createdby.equals(req.user.id)){
        next(new Errorhandler("you can't delate this album",401))
    }
        const index = album.songs.indexOf(req.params.songId)
        album.songs.splice(index, 1)
        await album.save()
        return res.status(200).json({
            success: true,
            message: 'song removed successfully!'
        })
})


//like a song
exports.likeAndUnlike = catchAsyncErrors(async (req, res, next) => {

    const song = await Songs.findById(req.params.id)
    if (!song) {
        return next(new Errorhandler('song Not Found', 404))
    }
    if (song.likes.includes(req.user.id)) {
        const index = song.likes.indexOf(req.user.id)
        song.likes.splice(index, 1)
        await song.save()
        return res.status(200).json({
            success: true,
            message: 'Unlike song'
        })
    }
    else {
        song.likes.push(req.user.id)
        await song.save()
        return res.status(200).json({
            success: true,
            message: 'Added To Liked song'
        })
    }
})

// Most Liked Songs

exports.mostLikedSong = catchAsyncErrors(async (req, res, next) => {
    const song = await Songs.find({}).populate("artistInfo",
    "name avatar").sort({likes:-1}).limit(25)

    console.log(song)
    if (!song) {
        return next(new Errorhandler('Songs Not Found'), 404)
    }

    res.status(201).json({
        success: true,
        song
    })
})


//Most recent songs

exports.recentSongs = catchAsyncErrors(async(req,res,next)=>{
    const song = await Songs.find({}).sort({$natural:-1}).limit(25)
    if(!song){
        return next(new Errorhandler('Nothing to show her',204))
    }

    res.status(200).json({
        success:true,
        song
    })
})
//Most recent albums

exports.recentSongs = catchAsyncErrors(async(req,res,next)=>{
    const albums = await Album.find({}).sort({$natural:-1}).limit(25)
    if(!albums){
        return next(new Errorhandler('Nothing to show her',204))
    }

    res.status(200).json({
        success:true,
        albums
    })
})