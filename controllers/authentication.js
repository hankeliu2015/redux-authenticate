const User = require('../models/user')
exports.signup = function(req, res, next) {
  // res.send({ success: 'true'});
  // console.log(req.body);

  // if user with email exists. Need to access user email from request object
  // these data we got decide weather we should make a new user
  const email = req.body.email;
  const password = req.body.password;

  // user the user model created in mongroose to search existing user in database
  // findOne, once the search complete, invoke a callback.
  // if user exist, the callback function 2nd argument will be populated with the exist user object.
  // if user not exist, existingUser argument value will be null.
  User.findOne({email: email}, function(err, existingUser) {
    // err will be populated if database connection not exists.
    if (err) { return next(err)};
    // when user signup, if email exists, return error
    // 422 is unprocessible entity , send a respose with message.
    if(existingUser) {
      return res.statue(422).send({error: 'email is in use'});
    }
    // when user sign up. email not exists, create and save user record
    const user = new User({email: email, password: password});
    user.save(function(err) {
      // pass a callback to know when this user saved, pass in error if fail to save.
      if(err){return next(err);}
      // respond to request indicating user created.
      res.json({success: true})
    });
  });
}
