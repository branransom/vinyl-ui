const passport = require('koa-passport');

const requireSignIn = passport.authenticate('oauth2', {
  failureRedirect: '/login',
});

module.exports = { requireSignIn };
