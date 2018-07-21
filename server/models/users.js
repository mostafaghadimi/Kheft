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
  phoneNumber: {
    type: Number,
    required: true,
    trim: true
  },
  university: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  inboxMessages: {
    type: Array
  },
  submittedBooks:{
    type: Array
  },
  profilePicture: {
    // TODO: edit the default mode picture
    type: String,
    default: '/'
  }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
