const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const router = require('./User-routers/router');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
//morgan & cors,middlewar Implement...
app.use(morgan("dev"));
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(express.json());
app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret:'secret',
}));
require('./User-routers/Passport');
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads/images',express.static('uploads/images'));
app.use('/uploads/prodectimage2',express.static('uploads/prodectimage2'))
app.use(express.static(path.join(__dirname,'Public')));

//mongoose Implement..
mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.connect("mongodb://localhost:27017/TN-Petshop",()=>{
 console.log("Mongo DB is connected with "+process.env.MONGODB)
});

//router Implement...
app.use('/',router)
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'Public'))
});

//Starting server..
PORT = process.env.PORT || 8000 ; 
app.listen(PORT,()=>{
    console.log("Server is started in "+ PORT)
});
