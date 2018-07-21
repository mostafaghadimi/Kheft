var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  picture:{
    type: String,
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
  }
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
