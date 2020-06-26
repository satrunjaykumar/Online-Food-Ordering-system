const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
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

//Admine Routes---->
const AdminRoute=require("./routes/Admin-route");
const DishRoute=require("./routes/dish-route");
const showDishes=require("./routes/show-dishes-route");
const editDish=require("./routes/edit-dish-route");
const deleteDish=require("./routes/delete-dish-route");


app.use("/",AdminRoute);
app.use("/",DishRoute);
app.use("/",showDishes);
app.use("/",editDish);
app.use("/",deleteDish);


// User Routes------>

const homepageRoute=require("./routes/home-page-route");
const newUserRoute=require("./routes/signup-route");
const UserLoginRoute=require("./routes/user-login-route");
const userDetailsRoute=require("./routes/user-details-route");
const cartRoute=require("./routes/cart-route");

app.use("/",homepageRoute);
app.use("/",newUserRoute);
app.use("/",UserLoginRoute);
app.use("/",userDetailsRoute);
app.use("/",cartRoute);
app.listen(3000,console.log("server is running in port 3000"));