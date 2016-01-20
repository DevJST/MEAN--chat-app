// third-party modules
var 
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv'),
    jwt = require('jsonwebtoken');
    

// custom modules
var 
    connection = require('../lib/connection');

// load .env file
dotenv.load();    


var 
    // express router
    router = express.Router(),
    // get mongose model
    User = mongoose.model('User');

router.get( '/', function(req, res) {
    res.render('index');
});

router.post( '/login', function(req, res) {
    User.find({ nickname: req.body.userLogin }, function(err, user) {
        if (err) throw err;
        
        var output = {};
        
        if(!user.length) {
            var newUser = User({
                nickname: req.body.userLogin
            });
            
            newUser.save(function(err) {
                if (err) throw err;

                output.success = true;
                output.token = jwt.sign(newUser, process.env.AUTH_SECRET_KEY);
                res.json(output); 
            });
        } else {
            output.success = false;
            output.errMessage = 'podany login jest juz zajęty'
            res.json(output);
        }
    });
});

router.post( '/chat-room', function(req, res) {
    var token = req.body.token;
    
    jwt.verify(token, process.env.AUTH_SECRET_KEY, function(err, decoded) {
        if (!err) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = router;