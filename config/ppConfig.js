const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
let User = require('../models/user');

passport.serializeUser(function(user,done){
  done(null,user);
});

passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(null,user);
  })
});

passport.use(new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
},function(username, password, done){
  User.findOne({username:username},function(err,user){
    if(err){
      console.log('could not find user',err);
      return done(err);
    }
    if(!user){
      return done(null,false);
    }
    if(!user.validPassword(password)){
      console.log('invalid password');
      return done(null,false);
    }
    return done(null, user);
  })
}));

//facebook passport Strategy
passport.use(new facebookStrategy({
  clientID: "1879963598914793",
  clientSecret: "3b0bd99aef5ce28257603473437acff2",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
      // if there is an error, stop everything and return that
      if (err) return done(err);
      // if the user is found, then log them in
      if (user) {
        return done(null, user); // user found, return that user
      }
      // if there is no user found with that facebook id, create them
      var newUser = new User();
      // set all of the facebook information in our user model
      newUser.facebook.id    = profile.id; // set the users facebook id
      newUser.facebook.token = token; // we will save the token that facebook provides to the user
      newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
      newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

      // save our user to the database
      newUser.save(function(err) {
        if (err) throw err;
        // if successful, return the new user
        return done(null, newUser);
      });
    })
}))

module.exports = passport;
