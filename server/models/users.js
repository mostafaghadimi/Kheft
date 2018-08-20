var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
<<<<<<< HEAD
  username:{
    type: String,
    trim: true,
    required: true
  },
  credit:{
    type: Number,
    default:0
=======
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
>>>>>>> 1299f3d2ce0d84fbaf61243df879a26697ccf3c9
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  credit:{
    type: Number,
    default:0
  },
  password: {
    type: String,
    required: true
  },
  telegramId:{
    type: String,
    trim: true,
  },
  university: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  university: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  requestsReceived :{
    type : Array,
    default : []
  },
  requestsMade :{
    type : Array,
    default : []
  },
=======
  inboxMessages: {
    type: Array
  },
>>>>>>> 1299f3d2ce0d84fbaf61243df879a26697ccf3c9
  profilePicture: {
    type: String,
    default: 'default'
  },
  verified : {
    type : Boolean,
    default : false
  }
});

userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          console.log('password incorrect : \''+password);
          return callback();
        }
      })
    });
}

var User = mongoose.model('User', userSchema);
module.exports = User;
