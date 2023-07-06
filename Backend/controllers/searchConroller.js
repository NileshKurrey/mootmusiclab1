const Artist = require('../models/UserModals/artistSchema')
const Song = require('../models/SongModals/songsSchema')
const Album = require('../models/SongModals/AlbumSchema')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

exports.searchData = catchAsyncErrors(async (req, res, next) => {
    const search = req.query.search
    const artist = await Artist.find({}).populate('artistInfo', 'name email avatar')
    if (search != '') {
        const songs = await Song.find({
            songName: { $regex: search, $options: "i" },
        }).limit(20);
        console.log(songs)
        const album = await Album.find({
            albumName: { $regex: search, $options: "i" },
        }).limit(20);
       await artist.find({'artistInfo.name':{$regex:search,$options:'i'}}).limit(20);
        const result = { songs, album, artist };
        console.log(result)
        res.status(200).send(result);
    } else {
        res.status(200).send({});
    }
})

