const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// local Strategy
const localOptions = { usernameField: 'email'}
const localLogin = new LocalStrategy({localOptions}, function(email, password, done) {
  console.log("hello from passport")

  User.findOne({email: email}, function(err, user) {
    if(err){ return done(err);}
    if(!user) { return done(null, false);}
    // compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) {return done(null, false); }
      return done(null, user);
    });
  });
});

// JWT Strategy
const jwtOptions ={
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {

  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false);}
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
})

passport.use(localLogin);
passport.use(jwtLogin);
