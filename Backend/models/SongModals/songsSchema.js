const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    songName:{
            type:String,
            required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    songUrl:{
        type:String,
    },
    artistList:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    createdby:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    genre:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Genre'
        }
    ],
    createdAt:{
        type:Date,
        defualt:Date.now,
    },
    likes:[{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },]
})

module.exports = mongoose.model('Song',SongSchema)