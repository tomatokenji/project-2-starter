const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  members:[{type: mongoose.Schema.Types.ObjectId, ref:'user'}],

  chatCreated:{
    type:Date,
    required:true
  },

  name:{
    type: String,
    required: true
  },


})


let Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;
