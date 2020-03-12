var express =require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
//database connection
var db=mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


//running server
app.listen(3000,function(){
    console.log("Server is running ");
});