//required stuff
require('dotenv').config({ silent: true });
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const express =require('express')
const app = express()
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const User = require('./models/user')
const Event = require('./models/event')
const methodOverride = require('method-override')
const isLoggedIn = require('./middleware/isLoggedIn')

//routers
const authRouter = require('./routers/auth_router');
const homeRouter = require('./routers/home_router');
const eventRouter = require('./routers/event_router');

//need consts for the passport
const passport = require('./config/ppConfig')
const session = require('express-session')

mongoose.connect('mongodb://localhost/projectSport')

mongoose.Promise = global.Promise

//middlewares

app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(ejsLayouts)

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  uninitialized: true,
}))

app.use(flash());
app.set('view engine', 'ejs')
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.use('/auth',authRouter);

app.get('/',function(req,res){
  console.log('get');
  res.render('./homepage/login');
})

app.use(isLoggedIn);
app.use('/home',homeRouter);
app.use('/event',eventRouter);

app.listen(3000,function(){
  console.log("3000 connected");
})

//
// var temp2 = function(event){
//   event.peopleAttending.push("588488f05672a143f8e56d85");
//   event.save(function(err){
//     if(err){return console.log(err)};
//     console.log(event.peopleAttending);
//   });
// };
//
// temp(temp2);

// temp(function(event){
//   var x = new Date();
//   x.setMonth(5)
//   event.date = x;
//   event.save(function(err){
//       if(err){return console.log(err)};
//       console.log(event.peopleAttending);
//     });
// })
