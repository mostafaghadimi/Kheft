var express = require('express');
var app = express();

var path = require('path');

var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.emit('this', {will: 'be recieved by everyone'})
  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });
})


// Running Server On the defined port
port = 3000;
serverMsg = function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('hey there! I\'m listinng on port ' + port + '\nTake care of what you are saying :))');
  }
}
server.listen(port, serverMsg);

// DataBase using Mongoose because of simplicity and schema
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/KheftKetab', {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connected!');
});

// BodyParser is the package to have access on request parameters sent from client
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// A package for hashing the passwords https://www.npmjs.com/package/bcrypt
var bcrypt = require('bcrypt');

// mapping static files
app.use('/build', express.static(path.join(__dirname, '../build/')));
app.use('/styles', express.static(path.join(__dirname, '../styles/')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts/')));
app.use('/assets', express.static(path.join(__dirname, '../assets/')));
app.use('/profilePicture', express.static(path.join(__dirname, '../assets/uploads/profilePicture')));

// Session
var session = require('express-session');
app.use(session({
  secret: 'KheftKetab.ir',
  saveUninitialized: false,
  resave: true,
}));

// Response to Requests in separated file
var routes = require('./routes');
app.use('/', routes);