const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const router=express.Router();
const session= require('express-session');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
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
  }).single("dish_img");

var dish=require("../modules/dish-model");

router.get("/admin-profile/edit-dish/:id",(req,res)=>{
    dish.findOne({_id:req.params.id},(err,data)=>{
       if(err) throw err;
       res.render("edit-dish",{data:data});
    });
});

router.post("/admin-profile/edit-dish/:id",uploadfn,(req,res)=>{
       if(req.file !=='undefined'){
        dish.updateOne({_id:req.params.id},{price:req.body.price,img_src:"/uploads/"+req.file.filename},(err,data)=>{
           if (err) throw err;
           res.redirect("/admin-profile/show-dishes/");
        });
     }
     else{
         dish.updateOne({_id:req.params.id},{price:req.body.price},(err,data)=>{
            if (err) throw err;
            res.redirect("/admin-profile/show-dishes/");
         });
     }
    
});

module.exports=router;