const passport = require('koa-passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const { uuid } = require('uuidv4');

const TokenManager = require('./TokenManager');

const { SPOTIFY_CLIENT_ID } = process.env;
const { SPOTIFY_CLIENT_SECRET } = process.env;

const users = [];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);

  if (!user) {
    return done(null, false);
  }

  done(null, user);
});

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://accounts.spotify.com/authorize',
      tokenURL: 'https://accounts.spotify.com/api/token',
      clientID: `${SPOTIFY_CLIENT_ID}`,
      clientSecret: `${SPOTIFY_CLIENT_SECRET}`,
      callbackURL: 'http://localhost:3000/callback',
    },
    (accessToken, refreshToken, params, profile, done) => {
      const tokenManager = new TokenManager(
        accessToken,
        refreshToken,
        params.expires_in
      );

      const user = { id: uuid(), tokenManager };
      users.push(user);

      done(null, user);
    }
  )
);
