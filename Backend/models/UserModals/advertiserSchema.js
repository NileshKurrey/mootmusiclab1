const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    AdertiserInfo:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
    }
,
    AdertiserRole:{
           type:String,
           require:true
    },
    country: {
        type: String,
        required: true,
      },
    phoneNo: {
        type: Number,
        required: true,
        minLength:[10,'PhoneNo should be 10 Number']
      },
    proposals:[
        {
            proposalsMsg:{
                type:String
            },
            proposalto:{
                type: mongoose.Schema.ObjectId,
                ref: "Artist",
               
              },
            propasalStatus:{
                type:String,
                default:'received'
            }   
        }
    ],
    workWith:[{ 
        artistInfo:{
            type: mongoose.Schema.ObjectId,
            ref: "Artist",
          }}
    ],
    createdAt:{
        type:Date,
        defualt:Date.now
    }
})

module.exports = mongoose.model("Advertiser" ,artistSchema)