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

router.get("/Taste-King/user-profile/cart/:id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        User.findOne({_id:req.params.id},(err,data)=>{
            if(err)throw err;
            Cart.find({user_id:req.params.id},(err1,items)=>{
                if(err1)throw err1;
                res.render("cart",{data:data,items:items,len:items.length});
            });
        });
    }
    else{
        res.redirect("/");
    }
    
});

router.get("/Taste-King/user-profile/:id/:item_id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        
        Cart.find({user_id:req.params.id, item_id:req.params.item_id},(err1,data1)=>{
            if(err1) throw err1;
           if(data1.length!=0){
                res.redirect("/Taste-King/user-profile/"+req.params.id);
           }
           else{
             Dish.findOne({_id:req.params.item_id},(err2,data2)=>{
                if(err2) throw err2;
                new_item= new Cart({
                 user_id:req.params.id,
                 item_id:req.params.item_id,
                 item_name:data2.name,
                 price:data2.price,
                });
                new_item.save();
             }); 
             res.redirect("/Taste-King/user-profile/"+req.params.id);
         }
           
        });
     
    }
    else{
        res.redirect("/");
    }
});

router.get("/Taste-King/user-profile/delete/:id/:item_id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        
        Cart.deleteOne({item_id: req.params.item_id,user_id:req.params.id},(err)=>{
            if(err) throw err;
            console.log("deleted from cart sucessfully!");
            res.redirect("/Taste-King/user-profile/cart/"+req.params.id);
        });    }
    else{
        res.redirect("/");
    }
    
});

router.get("/Taste-King/user-profile/cart/order-now/:id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        
        Cart.deleteMany({user_id:req.params.id},(err)=>{
            if(err) throw err;
            console.log("Cleared cart sucessfully!");
            res.redirect("/Taste-King/user-profile/"+req.params.id);
        });    }
    else{
        res.redirect("/");
    }
    
});
module.exports=router;