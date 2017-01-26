const Event = require('../models/event');
const moment = require('../public/js/moment');
const User = require('../models/user');

let eventController = {
  //show the create form
  createEvent: function(req,res){
    res.render('./event/create_event',{user: req.user});
  },

  //post the new created event
  create:function(req,res){
    console.log(req.body);
    Event.create({
      //i can reduce this to req.body if needed (although peopleattending, org not in)
      title:req.body.title,
      datetime: req.body.datetime,
      minPax: req.body.minPax,
      maxPax: req.body.maxPax,
      location:req.body.location,
      category: req.body.category,
      description:req.body.description,
      peopleAttending: [req.user._id],
      organizer: req.user._id,
    },function(err,event){
      if(err){
        console.log(err);
        req.flash("an error occured could not create user account");
        res.redirect('/event/new');
      };
      User.findById(req.user._id,function(err,user){
        if(err){return console.log(err)}else{
          user.eventsCurrent.push(event);
          user.save();
        }
      })
      console.log(event);
      req.flash("event created!");
      res.redirect('/event/'+event._id)
      //just to test awhile
      // let n = Date.now();
      // Event.find({"datetime": {$gt:n}},function(err,event){
      //   if(err){return console.log(err)};
      //
      //   res.render('./event/list_events',{user:req.user,events:event})
      // })
    })
  },

  listEvents: function(req,res){
    res.render('./event/list_events',{"user": req.user, "moment": moment});
  },

  getEvent: function(req,res){
    Event.findById(req.params.id).populate('peopleAttending').exec(function(err,event){
      if(err){
        console.log(err);
        req.flash("event not found");
        res.redirect("/event/");
      }else{
        console.log(event.peopleAttending)
        var people = event.peopleAttending;
        res.render('./event/event_details',{"user":req.user,"event":event,"moment": moment,"people":people});

      }

    })
  },

  delete: function(req,res){
    Event.findByIdAndRemove(req.params.id,function(err){
      if(err){
        console.log(err);
        res.redirect("/home/" + req.user.username);
        req.flash("error in deleting event");
      }else{
        console.log("event deleted");
        res.redirect("/home/"+req.user.username);
        req.flash("success in deletion");
      }
    })
  },

  editPage: function(req,res){
    Event.findById(req.params.id,function(err,event){
      console.log(event.datetime,"original object");
      if(err){
        console.log(err);
        req.flash("error in getting edit page");
        res.redirect('/home/' + req.user.username);
      }else{
        res.render('./event/edit',{"user":req.user, "event": event, "id":req.params.id, "moment":moment});
      }
    })
  },

  //edit function not tested yet
  edit: function(req,res){
    console.log(req.params,"params");
    let item = {};
    let key = req.body.name;
    let value = req.body.value;
    if(key==="datetime"){
      value = req.body.value;
      console.log(value,"datetime");
    }
    item[key] = value;
    console.log(item,"item")
    Event.findByIdAndUpdate(req.params.id,item,function(err,event){
      if(err){
        console.log(err);
        req.flash("error in updating event details");
        res.redirect("/home/" + req.user.username);
      }else{
        console.log(req.body);
        console.log("event updated!");
        //why is redirect / flash not called?
        req.flash("event updated!");
        res.redirect("/event/"+ event._id);
      }
    })
  },

  join:function(req,res){
    Event.findById(req.params.id).populate('peopleAttending').exec(function(err,event){
      if(err){
        console.log(err);
        req.flash("error in finding event");
        res.redirect("/home/"+req.user.username);
      }else{

        let same = false;
        let notFull = true;
        //test that the user never join before
        for(let i=0; i<event.peopleAttending.length;i++){
          if(event.peopleAttending[i]._id.toJSON() ===req.user._id.toJSON()){
            same = true;
            console.log("TRUEEEEE")
            break;
          }
        }
        //test that the event is not fully subscribed
        if(!(event.peopleAttending.length < event.maxPax)){
          notFull = false;
        }
        if(!same && notFull ){
          console.log("joined event");
          event.peopleAttending.push(req.user._id);
          event.save();
          User.findById(req.user._id,function(err,user){
            user.eventsCurrent.push(event._id);
            user.save();
            console.log("events attended updated")
          })
          req.flash("joined event!");
          res.redirect("/event/" + event._id);
        }else{
          console.log("error in event");
          req.flash("error in joining event")
          res.redirect("/event/" + event._id);
        }
      }

      // console.log(arr.includes(req.user),"req user");
      // console.log(arr.includes(req.user._id),"req user id");
      // event.peopleAttending.push(req.user);
      //
      // console.log("joined event");
      // console.log(event.peopleAttending)
    })
  },

}

module.exports = eventController;
