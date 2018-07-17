var express = require('express');
var router = express.Router();

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

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , '../index.html'));
});

router.get('/logout', (req, res) => {
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

module.exports = router;
