'use strict';

// integrated modules
var 
    http = require('http'),
    path = require('path');

// third-party modules
var 
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    socket = require('socket.io'),
    dotenv = require('dotenv'),
    jwt = require('jsonwebtoken'),
    socketioJwt = require('socketio-jwt');
    

// custom modules
var 
    appRoutes = require('./routes/app-routes'),
    connection = require('./lib/connection'),
    User = mongoose.model('User');

// load .env file
dotenv.load();

// create express app
var app = express();

// set root directory for public files
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set views folder and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app routes
app.use(appRoutes);

// create server
var server = http.createServer(app);
server.listen(process.env.SERVER_PORT || 3000, process.env.SERVER_HOST || 'localhost');

// attach socket.io
var io = socket.listen(server);

// Socket.io auth middleware 
io.set('authorization', socketioJwt.authorize({
  secret: process.env.AUTH_SECRET_KEY,
  handshake: true
}));

// Socket.io connection event 
io.sockets.on('connection', function (socket) {
    console.log("connected");
});