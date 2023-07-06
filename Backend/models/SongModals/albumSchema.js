const mongoose = require('mongoose')

const AlbumSchema = new mongoose.Schema({
    albumName:{
            type:String,
            required:true
    },
    thumbnail:{
        type:String,
        required:true
    },

    createdby:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    songs:[{
        type:mongoose.Schema.ObjectId,
        ref:'Song'
    }],
    createdAt:{
        type:Date,
        defualt:Date.now()
    }
})

module.exports = mongoose.model('Album',AlbumSchema)