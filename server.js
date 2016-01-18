'use strict';

// integrated modules
var 
    http = require('http'),
    path = require('path');

// third-party modules
var 
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// custom modules
var 
    connection = require('./lib/connection'),
    User = mongoose.model('User');

var app = express();

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get( '/', function(req, res) {
    res.render('index');
});

app.post( '/login', function(req, res) {
    User.find({ nickname: req.body.userLogin }, function(err, user) {
        if (err) throw err;
        
        var output = {};
        output.success = true;
        
        
        if(!user.length) {
            var newUser = User({
                nickname: req.body.userLogin
            });
            
            newUser.save(function(err) {
                if (err) throw err;

                // output.success = true; - by doing this way, empty object is returned as the response 
            });
        } else {
            output.success = false;
            output.err = 'podany login jest juz zajęty'
        }
        console.log(output);
        res.end(JSON.stringify(output));
    });
});

app.listen(3000);