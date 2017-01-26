module.exports = function(req, res, next) {
  console.log(req.user,"user");
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page');
    res.redirect('/');
  } else {
    next();
  }
};
