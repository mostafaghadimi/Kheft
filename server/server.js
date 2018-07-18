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

// A package for hashing the passwords https://www.npmjs.com/package/bcrypt
var bcrypt = require('bcrypt');

// mapping static files :))
app.use('/build', express.static('../build/'));
app.use('/styles', express.static('../styles/'));
app.use('/scripts', express.static('../scripts/'));

// Session
var session = require('express-session');
app.use(session({
  secret: 'KheftKetab.ir',
  saveUninitialized: false,
  resave: true,
  cookie: {
    secure: true
  }
}));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , '../index.html'));
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


// Response to Requests in separated file
// var routes = require('./routes.js');
// app.use('/', routes);
