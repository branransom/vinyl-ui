import passport from 'koa-passport';

const requireSignIn = passport.authenticate('oauth2', {
  failureRedirect: '/login',
});

export default requireSignIn;
