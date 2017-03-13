var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); 
 
app.get('/', function (req, res) {
  var data = fs.readFileSync('shorturl.txt');
  var arr = data.toString().split(";");
  var str = "";
  for (index in arr) {
    str += "<br>" + index + ": " + arr[index];
  }
  res.send(str);
});

app.get('/new/*', function (req, res) {
  var url = req.params[0];
  var reg = /^http(s)?:\/\/(www\.)?(\w+\.){1}(\w+){1}$/;
  if (!reg.test(url)) {
    res.send("invalid url!");
    return;
  }
  //console.log(url);
  var data = fs.readFileSync('shorturl.txt');
  var arr = data.toString().split(";");
  arr.push(url);
  fs.writeFile('shorturl.txt', arr.join(";"), function(err) {
    if (err) throw err;
  });
  var str = "";
  for (index in arr) {
    str += "<br>" + index + ": " + arr[index];
  }
  res.send(str);
});

app.get('/*', function (req, res) {
  var data = fs.readFileSync('shorturl.txt');
  var arr = data.toString().split(";"); 
  var index = parseInt(req.params[0]);
  console.log(index);
  if (index < arr.length) {
    var url = arr[req.params[0]];
    res.redirect(url);
  }
  else {
    res.send('This short url is invalid!');
  }
});
 
var server = app.listen(process.env.PORT || 5000, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
 
});