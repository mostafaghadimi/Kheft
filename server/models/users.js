var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username:{
    type: String,
    trim: true,
    required: true
  },
  credit:{
    type: Number,
    default:0
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  telegramId:{
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
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
  profilePicture: {
    type: String,
    default: 'default'
  },
  verified : {
    type : Boolean,
    required : true,
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
