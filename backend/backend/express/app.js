require('dotenv').config(); 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors= require("cors")
const bodypasrer = require("body-parser")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer");
 const roters = require("./routes/urlLinks");
const log = require('./middleware/multerconfig');



var app = express();

mongoose.connect("mongodb+srv://kosireddysudheer803:pMImhxbsZ4QqAYDH@cluster0.stqqg.mongodb.net/Drive")
.then(result => {
  console.log("Connected to mongodb")
})
.catch(err => {
  console.log(err)
})


const handlePort = () =>{
  console.log('Port working on http://localhost:5001')
}
app.use(cors())  
app.use(bodypasrer.json());

app.use("/upload",roters);

app.listen(5001, handlePort);   

app.use(log)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
