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


router.get("/admin-profile/show-dishes/",(req,res)=>{
    var dish=require("../modules/dish-model");
    dish.find({},(err,data)=>{
       res.render("show-dishes",{data:data});
    });
});

module.exports=router;