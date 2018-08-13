var mongoose = require('mongoose');
var tokenSchema = new mongoose.Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token: {
       type: String,
       required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 86400
    }
});


var Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
