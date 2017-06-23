var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var autoincrement = require('mongoose-auto-increment');
var app = express();
var dbURI = 'mongodb://localhost/test'; 
var db = process.env.DB_ENV || 'test';
var PORT = process.env.port || 3000;

app.use(bodyParser.json());
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Connected to ' + db + ' DB...');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log(err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
var gracefulExit = function() {
  mongoose.connection.close(function () { 
    console.log('Connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

app.listen(PORT, function (err) {
  if (err) {
    console.log("Error connecting to port" + PORT);
  }
  else {
    console.log('Running on port ' + PORT + '...');
  }
})

// Set CORS ORIGIN HEADERS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept');
    next();
});

// Models
User = require('./models/user');
Sample = require('./models/sample');

// Routes
var things = require('./routes/route');
var sample = require('./routes/sample_route');

// declaire things in app.use
app.use('/this/route', things);
app.use('/this/sample', sample);

app.use(function(err, req, res, next){
  res.status(500);
  res.json({ "data": null, "Error": err.message });
});

