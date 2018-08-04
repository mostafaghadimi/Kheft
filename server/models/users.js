var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
  // university: {
  //   type: String,
  //   required: true
  // },
  // fieldOfStudy: {
  //   type: String,
  //   required: true
  // },
  inboxMessages: {
    type: Array
  },
  submittedBooks:{
    type: Array
  },
  profilePicture: {
    type: String,
    default: 'default'
  },
  confirmed : {
    type : Boolean,
    required : true
  }
});

userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', userSchema);
module.exports = User;
