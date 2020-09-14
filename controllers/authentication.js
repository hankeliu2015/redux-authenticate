const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config')

// create a function, take user id and ecoded secret code

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}


exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  if (!email || ! password) {
    return res.status(422).send({error: 'email or password can not be blank'})
  }

  User.findOne({email: email}, function(err, existingUser) {
    if (err) { return next(err)};
    if(existingUser) {
      return res.status(422).send({error: 'email is in use'});
    }
    const user = new User({email: email, password: password});
    user.save(function(err) {
      if(err){return next(err);}
      // res.json({success: true})
      res.json({token: tokenForUser(user)});


    });
  });
}
