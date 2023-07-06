const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const errorMiddlware = require('./middleware/error');
const cors = require('cors')
const fileUplode = require('express-fileupload')
const app = express();
app.use(cookieParser());
app.use(cors({credentials: true}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb'}));
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUplode())
app.use(bodyParser.json());

//Route Imports 
const user = require('./routes/userRoutes')
const artist = require('./routes/artistRoute')
const advertiser = require('./routes/advertiserRoute')
const Song = require('./routes/songRoute')
const search = require('./routes/searchRoute')
app.use('/api/v1/',user);
app.use('/api/v1/',artist);
app.use('/api/v1/',advertiser);
app.use('/api/v1/',Song);
app.use('/api/v1/',search);

// Middleware For Errors
app.use(errorMiddlware)


module.exports = app;