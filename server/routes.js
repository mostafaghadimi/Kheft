var express = require('express');
var router = express.Router();
<<<<<<< HEAD
// In sendFile method to access the directory in which you are you need this part
var path = require('path');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var io = require('socket.io');
=======

var path = require('path'); // JS built-in method used for address mode! 

var nodemailer = require('nodemailer'); // Registration verification Email sender
var crypto = require('crypto'); // token creator

var bcrypt = require('bcrypt'); // Hashing user password in registration
>>>>>>> 1299f3d2ce0d84fbaf61243df879a26697ccf3c9

// Importing Models and Schemas from ./models/
var User = require('./models/users');
var Book = require('./models/book');
var Token = require('./models/mailToken');
var BookRequest = require('./models/bookRequest');

var multer = require('multer'); // recieve images from user
var upload = multer({dest: '../assets/uploads/profilePicture'}); //upload directory

router.get('/', (req, res) => {   
    res.sendFile(path.join(__dirname, '../assets/html/index.html'));
<<<<<<< HEAD
  }
  console.log(io.sockets);
=======
>>>>>>> 1299f3d2ce0d84fbaf61243df879a26697ccf3c9
});

router.post('/registration', upload.single('image'), (req, res, next) => {
  //TODO: translate the messages and using JSON Web Token to create token :). change the current email and password
  var hash = bcrypt.hashSync(req.body.password, 10);
  var userData = {
    name : req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash,
    university: req.body.university,
    fieldOfStudy: req.body.fieldOfStudy,
    telegramId : req.body.telegramId,
    profilePicture : req.file === undefined ? 'default' : req.file.filename
  }

  User.create(userData, function (error, user) {
    if (error) { //when Email is already exists come here, Because in mongoose Model we defined email uniqueness equals to true
      res.status(400).send('email already exists.');
      return next(error);
    }
    else {
      req.session.userId = user._id;
      console.log(user);

      var tokenData = {
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex')
      };

      Token.create(tokenData,function(error,token){
        if(error){
          return res.status(500).send({ msg: err.message });
        }
        var transporter = nodemailer.createTransport({
           service: 'Gmail',
           auth: { user: 'kheftKetab' , pass: 'kheftKetab.ir' }
        });
        var mailOptions = { from: 'no-reply@KheftKetab.com', to: user.email,
          subject: 'Account Verification Token', text: 'Hello,\n\n' +
            'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host
              + '\/confirmation\/' + token.token + '.\n' };
              console.log(mailOptions.text);
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            console.log('ُSending Email failed. error :',err.message)
            return res.status(500).send({ msg: err.message });
          }
          return res.status(200).send('A verification email has been sent to ' + user.email + '.');
        });
      });
    }
  });
  // TODO: Captcha!
});

router.get('/token/resend',(req,res,next) => {
  //// TODO: JWT
  User.findOne({ _id: req.session.userId }, function (err, user){
    if(err) {
      return next(err);
    }
    if (!user){
      var err = Error('User not found');
      err.status = 400;
      return next(err);
    }
    var tokenData = {
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex')
    };

    Token.create(tokenData,function (err,token) {
      if (err) { return res.status(500).send({ msg: err.message }); }

        // Send the email
      var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      var mailOptions = { from: 'no-reply@KheftKetab.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
      transporter.sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send('A verification email has been sent to ' + user.email + '.');
      });
    });

  });
});

router.get('/confirmation/:token',(req,res,next) => {
  Token.findOne({ token: req.params.token })
    .exec(function (err, token) {
      if (err) {
        return next(err)
      } else if (!token) {
        var err = new Error('Token not found.');
        err.status = 401;
        return next(err);
      }

      User.findOne({ _id: token._userId }, function (err, user) {
        if (!user) {
          return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
        }
        else if (user.isVerified) {
          return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
        }
        // Verify and save the user
        user.verified = true;
        user.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send("The account has been verified. Please log in.");
        });
      });
    });
});

router.post('/login', (req, res,next) => {
  if (req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error){
        console.log(error);
        return next(error);
      }
      if (!user) {
        var err = new Error('Wrong password.');
        err.status = 401;
        return next(err);
      }
      console.log(user);
      req.session.userId = user._id;
      req.session.loggedIn = true;
      if (!user.verified){
        var err = new Error('This account has not been verified');
        err.status = 401;
        return next(err);
      }
      var redir = { redirect: "/home" };
      return res.json(redir);
    });
  }else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

router.post('/bookSubmit',upload.single('picture'),(req,res,next) => {
  console.log(req.body);
  var bookData = {
    name : req.body.name,
    author : req.body.author,
    year : req.body.year,
    publication : req.body.publication,
    ownerId : req.session.userId,
    picture : req.file === undefined ? 'default' : req.file.filename
  }

  Book.create(bookData, function (error, book) {
    if (error) {
      return next(error);
    } else {
      console.log('book id : ',book._id);
      return res.redirect('/home');
    }
  });
  console.log(bookData);
});

router.get('/home', function (req, res, next) {
  if(req.session.userId === undefined){
    return res.redirect('/');
  }
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else if(!user.verified){
          var err = Error('This account is not verified');
          err.status = 400;
          return next(err);
        } else {
          console.log('home : ',req.session.userId);
          res.send('<h1>Name: </h1>' + user.name + '<h2>Mail: </h2>'
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

router.get('/api/users/:username',(req, res, next) => {
  if (req.session.userId === undefined){
    //TODO: redirect to login page
    var err = new Error('Not authorized!');
    err.status = 400;
    return next(err);
  } else {
    User.findOne({ username: req.params.username }).exec(function(err,user){
      if (err) {
        return next(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return next(err);
      }
      return res.json(user);
    });
  }
});

router.get('/api/books/:id',(req,res,next) => {
  if (req.session.userId === undefined){
    var err = new Error('Not authorized!');
    err.status = 400;
    return next(err);
  }else {
    Book.findOne({ _id : req.params.id }).exec(function(err,book){
      if (err) {
        return next(err)
      } else if (!book) {
        var err = new Error('Book not found.');
        err.status = 401;
        return next(err);
      }
      return res.json(book);
    });
  }
});

router.post('/request/make',(req,res) => {
  var from = req.session.userId;
  var to = req.body.to;
  var bookId = req.body.bookId;
  var bookRequestData = {
    from : from,
    to : to,
    bookId : bookId
  };
  BookRequest.create(bookRequestData,(error,bookRequest) => {
    if (error) { return res.status(500).send({ msg: error.message }); }
    console.log('book request :',bookRequest._id);
    res.status(200).send('request submitted!');
  });
});

router.get('*', function(req, res){
   res.sendFile(path.join(__dirname, '../assets/html/not_found.html'));
});

module.exports = router;
