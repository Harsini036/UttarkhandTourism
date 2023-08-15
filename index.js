//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect('mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPSWD+'@cluster1.buvlfpj.mongodb.net/TourismDB');
}
 
// Creating a schema (similar to collection)
const userDataSchema = new mongoose.Schema({
  name: String,
  email : String,
  age : Number,
  reviews : String
});
 
// Creating a model under the schema//
const User = mongoose.model("User", userDataSchema);
 
const user1 = new User({
  name : "Neo",
  email : "neo@gmail.com",
  age : 20,
  reviews : "User friendly"
});
//user1.save();


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/spots",function(req,res){
  res.render("Display");
});


app.get("/feedback", function(req, res){
    res.render("Feedback");
});

app.post("/feedback",(req,res)=>{
    console.log(req.body); 
    const newUser = new User({
        name : req.body.username,
        email : req.body.email,
        age : req.body.userage,
        reviews : req.body.newFeedback
      });
    newUser.save()
    .then(success=>{
        console.log("saved successfully!");
        res.redirect("/");
    })
    .catch(err=>{
        console.log(err);
    });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(3000, function() {
  console.log("Server started on port 3000");
});