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
router.get("/userlogin/new-user",(req,res)=>{
    var sess=req.session;
    if(sess.email){
    res.redirect("/");
    }
    else{
        res.render("user-account-signup");    }
   
});

router.post("/userlogin/new-user",(req,res)=>{
 User.findOne({email:req.body.email},(err,data)=>{
    if(err) throw err;
    if(data){
        res.render("user-account-signup",{msg:"Email already Exists!"});
    }
    else{
        new_user= new User({
            username:req.body.usename,
            email:req.body.email,
            password:req.body.password,
            mobile_no:req.body.mobile,
            profile_img:"/images/profile_images/default.jpg",
        });
        new_user.save();
        res.redirect("/");
    }
 });
});

module.exports=router;