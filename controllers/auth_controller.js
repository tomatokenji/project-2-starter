const User = require('../models/user');
const passport = require('passport');

let authController = {
  //signup function
  signup: (req,res) => {
    User.create({
      username: req.body.username,
      name: req.body.name,
      email:req.body.email,
      password: req.body.password,
    }, function(err,user){
      if(err){
        console.log("error",err);
        req.flash("an error occured could not create user account");
        res.redirect('/#middle')
      }else{
        passport.authenticate('local',{
          successRedirect:'/home/' + req.body.username,
          successFlash:"Account created and logged in"
        })(req,res);
      }
    })
  },

  //i have no idea why but you must call the req res after, for all passport authenticates
  login: function(req,res){
    passport.authenticate('local',{
      successRedirect:'/home/' + req.body.username,
      successFlash:"you have logged in",
      failureRedirect:'/#middle',
      failureFlash:"invalid username / password",
    })(req,res)
  },

  loginFacebook: function(req,res){
    passport.authenticate('facebook',{
      scope:'email'
    });
  },

  loginFacebookAfter: function(req,res){
    passport.authenticate('facebook',{
      successRedirect:'/profile/' + req.body.username,
      successFlash: "you have logged in",
      failureRedirect:'/#middle',
      failureFlash:"invalid username / password",
    })(req,res)
  },

  logout: (req,res)=>{
    req.logout();
    req.flash('success',"logged out");
    res.redirect('/');
  },

  signupPage: (req,res)=>{
    res.render('auth/signup',{user:req.user});
  },

  loginPage:(req,res)=>{
    res.render('auth/loginPage',{user:req.user});
  },

  mainPage:(req,res)=>{
    res.render('auth/loginPage',{user:req.user});
  }
}


module.exports = authController;
