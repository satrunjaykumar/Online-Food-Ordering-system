const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const router=express.Router();

var jsonParser=bodyParser.json();
var urlencodedParser=bodyParser.urlencoded({extended:false}); 
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

mongoose.connect("mongodb://localhost:27017/TasteKing", {
               useUnifiedTopology: true,
               useNewUrlParser: true
        });


const UserSchema= mongoose.Schema({
    username:String,
    email:String,
    password:String,
    mobile_no:Number,
    profile_img:String,
    gender:String,
    address:String,
    description:String,
});

const User=mongoose.model('user',UserSchema);

module.exports=User;