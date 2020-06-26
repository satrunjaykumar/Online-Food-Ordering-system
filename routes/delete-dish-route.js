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

mongoose.connect("mongodb://localhost:27017/TasteKing", {
               useUnifiedTopology: true,
               useNewUrlParser: true
});

const session= require('express-session');
app.use(session({secret: 'fhstjhsdf#fsf',resave: false,
saveUninitialized: true,}));

const dish=require("../modules/dish-model");

router.get("/admin-profile/delete-dish/:id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        dish.deleteOne({_id: req.params.id},(err)=>{
            if(err) throw err;
            console.log("deleted dish sucessfully!");
            res.redirect("/admin-profile/show-dishes/");
        });
    }
    else{
    res.render('admin-login');
    }
    
});

module.exports=router;

