var mongoose = require('mongoose');
var bookRequestSchema = mongoose.Schema({
  from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  createdAt: {
      type: Date,
      required: true,
      default: Date.now,
  },
  status :{
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default : 'Pending'
  }
});

var BookRequest = mongoose.model('BookRequest', bookRequestSchema);
module.exports = BookRequest;
