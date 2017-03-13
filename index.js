var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
   var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
   var lang = req.get('accept-language').substr(0, 5);
   var reg = /\([^\)]*\)/
   //console.log(req.get('user-agent'));
   var info = reg.exec(req.get('user-agent'));
   res.send("{\"ip\": " + ip + ", \"language\": " + lang + ", \"software\": " + info + "}");
});
 
var server = app.listen(process.env.PORT || 5000, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
 
});