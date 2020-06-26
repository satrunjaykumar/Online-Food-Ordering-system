const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const router=express.Router();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const session= require('express-session');
app.use(session({secret: 'fhstjhsdf#fsf',resave: false,
saveUninitialized: true,}));

var jsonParser=bodyParser.json();
var urlencodedParser=bodyParser.urlencoded({extended:false}); 
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

mongoose.connect("mongodb://localhost:27017/TasteKing", {
               useUnifiedTopology: true,
               useNewUrlParser: true
        });


const User=require("../modules/user-model");
const Dish=require("../modules/dish-model");
const Cart=require("../modules/cart-model");

//necessary modules for img upload
var multer  = require('multer')
var path =require('path');
const { extname } = require('path');
var upload = multer({ dest: 'uploads/' })


// management of uploaded file names
var storage= multer.diskStorage({
  destination: "./public/uploads/",
  filename:(req,file,cb)=>{
     cb(null,file.fieldname +"_"+Date.now()+path.extname(file.originalname));
  }
});
// middleware for image upload
var uploadfn= multer({
    storage:storage
  }).single("profile_img");


router.get("/Taste-King/user-profile/profile-info/:id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        
        User.findOne({_id:req.params.id},(err,data)=>{
            if(err)throw err;
            Cart.find({},(err1,data1)=>{
               if(err1) throw err1;
               res.render("user-profile-view",{data:data,len:data1.length});
            });
            
        });    }
    else{
        res.redirect("/");
    }
    
});

router.get("/Taste-King/user-profile/edit-user/:id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        
        User.findOne({_id:req.params.id},(err,data)=>{
            if(err)throw err;
            Cart.find({},(err1,data1)=>{
                if(err1) throw err1;
                res.render("edit-user-profile",{data:data,len:data1.length});
            });
        });
    }
    else{
        res.redirect("/");
    }
    
});

router.post("/Taste-King/user-profile/edit-user/:id",uploadfn,(req,res)=>{
    var sess=req.session;
    if(sess.email){
        if(req.file !=='undefined'){
            User.updateOne({_id:req.params.id},{description:req.body.description, address:req.body.address,mobile_no:req.body.mob_no ,gender:req.body.gender, profile_img:"/uploads/"+req.file.filename},(err,data)=>{
               if (err) throw err;
               res.redirect("/Taste-King/user-profile/profile-info/"+req.params.id);
            });
         }
         else{
            User.updateOne({_id:req.params.id},{description:req.body.description, address:req.body.address,mobile_no:req.body.mob_no ,gender:req.body.gender},(err,data)=>{
                if (err) throw err;
                res.redirect("/Taste-King/user-profile/profile-info/"+req.params.id);
            });
         }
    }
    else{
        res.redirect("/");
    }
    
});
module.exports=router;