// jshint esversion:6

const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
});
app.post("/",function(req,res){
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    finalUrl = baseUrl + crypto + fiat;
    request(finalUrl,function(error,response,body){
        
    var data = JSON.parse(body);
    var price = data.last;
    var currentDate = data.display_timestamp;
    res.write("<p/>the current date is" + currentDate + " <p/>");
    res.write("<h1> the current price of bitcoin is " + crypto + "is" + price + fiat + " <h1/>")
    res.send();
    });
   
   
})
app.listen(3000,function(){
    console.log("server is runing at port 3000");
});