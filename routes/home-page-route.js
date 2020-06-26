const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const router=express.Router();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var jsonParser=bodyParser.json();
var urlencodedParser=bodyParser.urlencoded({extended:false}); 
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

const session= require('express-session');
app.use(session({secret: 'fhstjhsdf#fsf',resave: false,
saveUninitialized: true,}));

mongoose.connect("mongodb://localhost:27017/TasteKing", {
               useUnifiedTopology: true,
               useNewUrlParser: true
        });

const User=require("../modules/user-model");
router.get("/",(req,res)=>{
  var sess=req.session;
    if(sess.email){
      User.findOne({email:sess.email},(err,data)=>{
        res.redirect("/Taste-King/user-profile/"+data._id);
      });
    }
    else{
      res.render("home-page");
    }
});

module.exports=router;