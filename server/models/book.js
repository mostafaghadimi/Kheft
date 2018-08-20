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
