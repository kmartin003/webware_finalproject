var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/')));
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.post('/login',function(req,res){
  var user_name=req.body.user;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
