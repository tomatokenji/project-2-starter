const mongoose = require('mongoose');
let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    minLength: [5,"Please enter a username at least 5 characters long!"],
    maxLength:[15,"Please enter a username less than 16 characters long!"],
    unique: true,
  },

  facebook:{
    fbid: String,
    token: String,
    email: String,
    name: String,
  },

  name:{
    type: String,
    required: true,
  },

  email:{
    type: String,
    match: emailRegex,
    lowercase: true,
    unique: true,
    required: true,
  },

  password:{
    type:String,
    minLength: [8,"password length should be between 8-99 characters long"],
    maxLength: [99,"password length should be between 8-99 characters long"],
  },

  dateJoined: {
    type: Date,
    default: Date.now,
  },

  lastLoggedIn: {
    type: Date,
    default: Date.now,
  },

  connectionsMade:{
    type: Number,
  },

  //events should be event array objects
  eventsAttended:[{type: mongoose.Schema.Types.ObjectId, ref:'Event'}],

  eventsCurrent:[{type: mongoose.Schema.Types.ObjectId, ref:'Event'}],

  createdEvents:
    [{type: mongoose.Schema.Types.ObjectId, ref:'Event'}]
  ,

  interests:{
    type:String,
  },

  briefDescription:{
    type:String,
  },

})

//pw hash function
UserSchema.pre('save',function(next){
  let user = this;
  //break if the password nvr modify
  if (!user.isModified('password')) return next();

  let hash = bcrypt.hashSync(user.password,10);
  user.password = hash;
  next();
})

//pw compare function
UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

UserSchema.options.toJSON = {
  transform: function(doc, ret, options){
    //delete pw and return the ret
    delete ret.password;
    return ret;
  }
}

let User = mongoose.model('User', UserSchema)
module.exports = User;
