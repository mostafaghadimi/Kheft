var mongoose = require('mongoose');
var mailTokenSchema = new mongoose.Schema({
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

//for email verification
var Token = mongoose.model('MailToken', mailTokenSchema);
module.exports = Token;
