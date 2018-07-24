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
mongoose.connect('mongodb://localhost:27017/KheftKetab', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// In sendFile method to access the directory in which you are you need this part
var path = require('path');

// BodyParser is the package to have access on request parameters sent from client
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// A package for hashing the passwords https://www.npmjs.com/package/bcrypt
var bcrypt = require('bcrypt');
const saltRounds = 10;

// mapping static files
app.use('/build', express.static('../build/'));
app.use('/styles', express.static('../styles/'));
app.use('/scripts', express.static('../scripts/'));
app.use('/assets', express.static('../assets/'));
app.use('/profilePicture', express.static('../assets/uploads/profilePicture'));

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

// Importing Models and Schemas from ./models/
require('./models/users');
var UserModel = mongoose.model('User');

app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, '../assets/html/index.html'));
});

// mult can handle multipart and file data requests
var multer = require('multer')
var upload = multer({dest: '../assets/uploads/profilePicture'})

app.post('/registration', upload.single('image'), (req, res) => {
  //  Hashing the password to providing security
  var hashPassword;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    hashPassword = hash;
  });

  // TODO: Captcha!
  var user = new UserModel({name: req.body.name, email: req.body.email, telegramId: req.body.telegramId, password: hashPassword, profilePicture: req.files.filename});

  user.save((err) => {
    if (err) {
      console.log(err);
    } else {
      return {success: true};
    }
  })
  console.log(req.file);
  res.send('');
});

app.post('/login', (req, res) => {
  var hashPassword;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    hashPassword = hash;
    UserModel.find({email: req.body.email}, (err, data) =>{
      if (err) {
        // TODO: prevent server from crashing https://stackoverflow.com/questions/51490740/prevent-server-from-crashing-while-interacting-with-db/51490822?noredirect=1#comment89950381_51490822
        console.log(err);

      }
      else{
        var savedPassword;
        data.map((res) => {
          savedPassword = res.password ;
        });
        bcrypt.compare(hashPassword, savedPassword, (err, dataIsCorrect) => {
          if (dataIsCorrect) {
            // TODO: session true! :)
          }
          else {
            // TODO: return to the login
          }
        })
      }
    })

  });
})

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
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
