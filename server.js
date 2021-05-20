"use strict";
const express = require("express");

const app = express();
const server = require('http').Server(app);

const port = process.env.PORT || 8080;
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
	console.log('Server Started on port ' + port);
});