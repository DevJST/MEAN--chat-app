var mongoose = require('mongoose');

// create db connection 
mongoose.connect('mongodb://localhost/test');

// If the connection throws an error
mongoose.connection.on('error', function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// close the mongoose connection on Ctrl + c
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log( 'Mongoose default connection disconnected' );
    process.exit(0);
  });
});

require( '../models/user' );
require( '../models/message' );