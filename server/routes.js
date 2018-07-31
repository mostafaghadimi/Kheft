var express = require('express');
var router = express.Router();
// In sendFile method to access the directory in which you are you need this part
var path = require('path');

// Importing Models and Schemas from ./models/
var User = require('./models/users');

// mult can handle multipart and file data requests
var multer = require('multer');
var upload = multer({dest: '../assets/uploads/profilePicture'});


router.get('/', (req, res) => {
  if(req.session.userId !== undefined){
    res.redirect('/home');
  }
  else {
    res.sendFile(path.join(__dirname, '../assets/html/index.html'));
  }
});


router.post('/registration', upload.single('image'), (req, res, next) => {
  var userData = {
    name : req.body.name,
    email: req.body.email,
    telegramId : req.body.telegramId,
    password: req.body.password,
    profilePicture : req.file === undefined ? 'default' : req.file.filename
  }
  // // TODO: check for email existance

  User.create(userData, function (error, user) {
    if (error) {
      res.send('email already exists.');
      return next(error);
    } else {
      req.session.userId = user._id;
      console.log('user id : ',user._id);
      res.setHeader("Content-Type", "text/html");
      return res.redirect('/home');
    }
  });
  console.log(userData);

  // TODO: Captcha!
});

router.post('/login', (req, res,next) => {
  if (req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect(302,'/home');
      }
    });
  }else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

router.get('/home', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          console.log('home : ',req.session.userId);
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>'
           + user.email + '<br><a type="button" href="/logout">Logout</a>');
        }
      }
    });
});

router.get('/logout', (req, res) => {
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

router.get('*', function(req, res){
   res.sendFile(path.join(__dirname, '../assets/html/not_found.html'));
});

module.exports = router;
