var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var autoincrement = require('mongoose-auto-increment');
var app = express();

app.use(bodyParser.json());

// Set CORS ORIGIN HEADERS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept');
    next();
});

// Connect to mongoose:
mongoose.connect('mongodb://localhost/test');

// TODO AUTOINCREMENT

// Models
User = require('./models/user');
Sample = require('./models/sample');

// Routes
var things = require('./routes/route');
var sample = require('./routes/sample_route');

// declaire things in app.use
app.use('/this/route', things);
app.use('/this/sample', sample);

app.listen(3000, function(req, res) {
    console.log('Listening on port 3000!');
});


