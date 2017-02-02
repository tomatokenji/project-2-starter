// var fs = require(‘fs’);
const moment = require('moment')
const User = require('../models/user')

let profileController = {
  //render profile page
  getProfilePage: function(req,res){
    User.findOne({username: req.params.username}, function(err,userProfiled){
      if(err){
        console.log("user not found");
        req.flash("user not found");
        return
      }
      res.render('./profile/view_profile',{user:req.user, moment: moment, userProfiled:userProfiled })
    })
  },

  //render edit page
  getEditPage: function(req,res){
    res.render('./profile/edit_profile',{user:req.user})
  }

  //updating of user profile
  // uploadProfileImage: function(req,res){
  //   User.findById(req.user._id,function(err,user){
  //     if(err){return console.log(err)};
  //     user.profilepic.data = fs.readFileSync(req.files.avatar[0]);
  //     user.save();
  //   }
  // },


}

module.exports = profileController
