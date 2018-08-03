var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author:{
    type: String,
    required:true
  },
  year:{
    type: Number,
    required : true
  },
  publication:{
    type: String,
    required:true
  },
  ownerId:{
    type: String,
    required:true
  },
  // major: {
  //   type: Array,
  //   required: true
  // },
  picture:{
    type: String,
    default: 'default'
  },
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
