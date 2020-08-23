const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/user");

module.exports.local = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
