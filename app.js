var express = require('express');

var port = 8999;

var app = express.createServer();

app.get('/', function (req, res, next) {

res.send('Welcome');

});

app.listen(port);