const Event = require('../models/event')
const User = require('../models/user')
const moment =require('moment')

let homeController = {
  showHomepage:(req,res)=>{
    console.log(req.user);
    User.findById(req.user._id).populate('eventsCurrent').exec(function(err,user){
      if(err){return console.log(err)}else{
        //everytime, it will update database - for past and current events
        function categorizingTime(callback){
          let currentDate = new Date();
          for(let i=0;i<user.eventsCurrent.length;i++){
            if(moment(currentDate).isAfter(user.eventsCurrent[i].datetime)){
              console.log("time is less!");
              user.eventsAttended.push(user.eventsCurrent[i]);
              user.eventsCurrent.splice(i,1);
              user.save();
            }
          }
          callback();
        }

        function tempCallback(){
          res.render('./home/current_events',{user:req.user, events: user.eventsCurrent})
        }

        categorizingTime(tempCallback)
      }
    })
  },

  showListOfEvents:function(req,res){
    //filter for events that are upcoming
    let n = Date.now();
    Event.find({"datetime": {$gt:n}},function(err,event){
      if(err){return console.log(err)};
      res.render('./home/list_of_events',{user:req.user,events:event})
    })
  },

  showPreviousEvents:function(req,res){
    User.findById(req.user._id).populate('eventsAttended').exec(function(err,user){
      if(err){return console.log(err)};
      res.render('./home/previous_events',{user:req.user, events: user.eventsAttended})
    })

  }
}


module.exports = homeController;
