const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  messageString:{
    type:String,
    required:true
  },

  chatGroup:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'chat'
  },

  sentBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },

  timestamp:{
    type:Date,
    required: true,
  },
})

let Message = mongoose.model('Message',messageSchema);
module.exports = Message;
