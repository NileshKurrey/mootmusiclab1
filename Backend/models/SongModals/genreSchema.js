const mongoose = require('mongoose')

const GenreSchema = new mongoose.Schema({
    genreName:{
            type:String,
            required:true
    }
   
})

module.exports = mongoose.model('Genre',GenreSchema)