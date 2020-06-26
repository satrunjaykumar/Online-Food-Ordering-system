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
const Dish=require("../modules/dish-model");
const Cart=require("../modules/cart-model");

router.post("/Taste-King/user-profile/",(req,res)=>{
    var name=req.body.username;
    var pass= req.body.password;
    User.findOne({email:name, password:pass},(err,data)=>{
        if (err) throw err;
        if(data){
            var sess=req.session;
            sess.email=req.body.username;
            res.redirect("/Taste-King/user-profile/"+data._id);
        }
        else{
            var msg="Email or Password does not Match!";
            res.render('home-page',{msg:msg});
        }
     });
});

router.get("/Taste-King/user-profile/:id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        
        User.findOne({_id:req.params.id},(err,data)=>{
            if(err)throw err;
            var all,veg,non_veg,baverage,desert;
              Dish.find({},(err1,menu)=>{
                 if(err1)throw err1;
                 all=menu;
                 
             Dish.find({type:"Veg"},(err2,menu)=>{
                 if(err2)throw err2;
                 veg=menu;
                 Dish.find({type:"Non-Veg"},(err3,menu)=>{
                     if(err3)throw err3;
                     non_veg=menu;
                     Dish.find({genre:"Baverage"},(err4,menu)=>{
                         if(err4)throw err4;
                         baverage=menu;
                         Dish.find({genre:"Desert"},(err5,menu)=>{
                             if(err5)throw err5;
                             desert=menu;
                             Cart.find({},(err5,data5)=>{
                                 res.render("user-profile",{data:data,all:all,veg:veg,nonveg:non_veg,baverage:baverage,desert:desert,len:data5.length});
 
                             });
                             
                          });
                      });
                  });
 
             });
              });
            
         });
     }
    else{
        res.redirect("/");
    }
    });
router.get("/Taste-King/About-us/:id",(req,res)=>{
    var sess=req.session;
    if(sess.email){
        
        User.findOne({_id:req.params.id},(err,data)=>{
            if(err) throw err;
           Cart.find({},(err2,data2)=>{
             if(err2) throw err2;
             res.render("about-page",{data:data,len:data2.length});
           });
     
        });    }
    else{
        res.redirect("/");
    }
   
});

router.get("/Taste-King/user/logout",(req,res)=>{
    req.session.destroy((err)=>{
    if (err) throw err;
    res.redirect("/");
    });

});
module.exports=router;