var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    requried: true,
    trim: true
  },
  author: {
    type: String,
    required:true,
    trim: true
  },

  year: {
    type: Number,
    required : true,
    trim: true
  },

  publication: {
    type: String,
    required:true,
    trim: true
  },

  ownerId: {
    type: String,
    required:true,
  },

  price: {
    type: String,
    required: true
  },
  major: {
    type: Array,
    required: true
  },
  subject: {
    type: Array,
    required: true
  },
  picture:{
    type: String,
    default: 'default'
  },
  active :{
    type : Boolean,
    default : true
  }
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
