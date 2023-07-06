const mongoose = require('mongoose')

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true  }).then(()=>{
        console.log(`Mongodb connected To The server`);
    })
}

module.exports = connectDatabase;