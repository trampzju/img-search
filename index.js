var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); 
 
app.get('/imgsearch/*', function (req, res) {
  var data1 = fs.readFileSync('logs.txt');
  var arr1 = data1.toString().split(";");
  var when = new Date();
  var term = req.params[0];
  arr1.push('{"term": "' + term + '", "when": "' + when + '"}');
  fs.writeFile('logs.txt', arr1.join(";"), function (err) {if (err) throw err;}); 

  var data2 = fs.readFileSync('imgs.txt');
  var arr2 = eval(data2.toString());
  var keyword = term.split(" ").reduce(function(a, b){
    return "(" + a + ")" + ".*" + "(" + b + ")" + "+";
  });
  var reg = new RegExp(keyword, "i");
  var offset = req.query.offset || 5;
  var result = [];
  for (index in arr2) {
    if(reg.test(arr2[index].snippet)) {
      result.push(JSON.stringify(arr2[index]));
    }
  }  
  var str = "Results for \"" + req.params[0] + "\":<br>" + result.join("<br>");
  res.send(str);
});

app.get('/logs', function (req, res) {
  var data = fs.readFileSync('logs.txt');
  var arr = data.toString().split(";");
  var str = "Latest searchs:<br>" + arr.join("<br>");
  res.send(str);
});
 
var server = app.listen(process.env.PORT || 5000, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
 
});