var express = require('express')
var app = express();
var path = require('path');
var router = require('./routes');


app.use('/public', express.static(path.join(__dirname, '../public'))); //Make public folder public accessible

app.use('/', router());

var server_port = process.env.PORT || serverConfig.PORT;
app.listen(server_port, function () {
  console.log('Example app listening on port' + server_port + '!')
})
