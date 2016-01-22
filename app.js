"use strict";

const PORT = 4000;

var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var fs = require("fs");
var logger = require("morgan");
var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

app.get("/", function(req, res){
  var html = fs.readFileSync("index.html").toString();
  res.send(html)
});

app.post("/addTask", function(req, res){
  fs.readFile('public/tasks.json', (err, data) => { //couldn't get working with relative filepath from public folder
    if(err) return res.status(400).send(err);
    var storedData = JSON.parse(data);
    storedData.push(req.body);
    fs.writeFile('public/tasks.json', JSON.stringify(storedData), (err) => {
      if(err) return res.status(400).send(err);
      res.send(err || req.body);
    });
  });
});

app.listen(PORT, function(){
  console.log("Express server listening on port", PORT);
})
