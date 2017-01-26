const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "basketball",
  },

  datetime: {
    type:Date,
    required: false,
  },

  maxPax:{
    type: Number,
    required: true,
  },

  minPax:{
    type:Number,
    required:true,
  },

  location:{
    type: String,
    required: true,
  },

  price:{
    type: Number,
  },

  description:{
    type: String,
    required: true,
  },
  //can potentially be a new object
  category:{
    type: String,
  },

  peopleAttending:
    [{type: mongoose.Schema.Types.ObjectId, ref:'User', unique: true}],

  organizer:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
})


let Event = mongoose.model('Event', eventSchema);

module.exports = Event;
