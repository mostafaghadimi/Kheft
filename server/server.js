var express = require('express');
var app = express();

// Running Server On the defined port
port = 3000;
serverMsg = function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('hey there! I\'m listinng on port ' + port + '\nTake care of what you are saying :))');
  }
}
app.listen(port, serverMsg);

// DataBase using Mongoose because of simplicity and schema
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/KheftKetab', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// In sendFile method to access the directory in which you are you need this part
var path = require('path');

// BodyParser is the package to have access on request parameters sent from client
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// mapping static files :))
app.use('/build', express.static('../build/'));

// Response to Requests in separated file
var routes = require('/routes.js');
app.use('/', routes);
