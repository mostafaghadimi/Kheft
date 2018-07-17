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

// In sendFile method to access the directory in which you are you need this part
var path = require('path');

// BodyParser is the package to have access on request parameters sent from client
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// mapping static files :)) 
app.use('/build', express.static('../build/'));

// TODO: use route to control request in several files
// var Router = require('route');

// Session
var session = require('express-session');
app.use(session({
  secret: 'KheftKetab.ir',
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , '../index.html'));
});
