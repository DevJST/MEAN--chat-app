'use strict';

// integrated modules
var 
    http = require( 'http' ),
    path = require( 'path' );

// custom modules
var express = require( 'express' );

var app = express();

app.use( express.static( 'public' ) );

app.set( 'views', path.join( __dirname, 'views') );
app.set( 'view engine', 'ejs' );


app.get( '/', function( req, res ) {
    res.render( 'index' );
});

app.listen( 3000 );