const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// JSON and sanitization libraries
const json = require('body-parser').json;
const sanitize = require('mongo-sanitize');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

// sanitize all json to and from mongoose
const cleanBody = function(req, res, next) {
  req.body = sanitize(req.body);
  next();
}

module.exports = function(app) {
  // app.get('/', function(req, res, next) {
  //   res.send(['water', "earth", 'fire', 'air'])
  // })
  app.get('/', requireAuth, function(req, res) {
    return res.send({hi: 'there'})
  })
  app.post('/signup', json(), cleanBody, Authentication.signup);
  app.post('/signin', json(), cleanBody, requireSignin, Authentication.signin);
}
