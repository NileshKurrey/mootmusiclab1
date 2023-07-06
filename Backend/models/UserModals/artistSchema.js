const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    artistInfo:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
    }
,
    artistRole:{
           type:String,
           require:true
    },
    country: {
        type: String,
        required: true,
      },
    about:{
        type:String
    }, 
    phoneNo: {
        type: Number,
        required: true,
      },
    proposals:[
        {
            proposalsMsg:{
                type:String
            },
            proposalGiven:{
                type: mongoose.Schema.ObjectId,
                ref: "Advertisers",
               
              },
            propasalStatus:{
                type:String,
                default:'received'
            }   
        }
    ],
    workWith:[{ 
        ArtistInfo:{
            type: mongoose.Schema.ObjectId,
            ref: "Advertisers",
          }}
    ],
    // AccountDetails:{
    //     cardNo:{
    //         type:Number,
    //         required:true
    //     }
    // }
    likes:[{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
  ],
  createdAt:{
    type:Date,
    defualt:Date.now
}
})

module.exports = mongoose.model("Artist" ,artistSchema)