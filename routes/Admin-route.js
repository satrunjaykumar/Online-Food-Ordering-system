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
    
var Admin=require("../modules/admin-model");

router.get("/AdminLogin100",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        res.redirect("/admin-dashboard");
    }
    else{
    res.render('admin-login');
    }
});

router.get("/admin-dashboard",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        
    res.render("admin-dashboard");
    }
    else{
        res.redirect("/AdminLogin100");
    }
})
router.post("/AdminLogin100",(req,res)=>{
    var name=req.body.email;
    var pass=req.body.pass;
        Admin.find({email:name,pass:pass},(err,data)=>{
           if (err) throw err;
         
           if(data.length!==0){
               var sess=req.session;
               sess.email=req.body.email;
               res.render('admin-dashboard',{email:name});
           }
           else{
               var msg="Email or Password does not Match!";
               res.render('admin-login',{msg:msg});
           }
        });
});

module.exports=router;