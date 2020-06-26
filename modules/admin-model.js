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

var Adminschema = mongoose.Schema({
    email: String,
    pass: String,
  });

  var Admin = mongoose.model("Admins", Adminschema);
  module.exports=Admin;