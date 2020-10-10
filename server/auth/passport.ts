import passport from 'koa-passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { v4 as uuid } from 'uuid';

import TokenManager from './TokenManager';

const { SPOTIFY_CLIENT_ID } = process.env;
const { SPOTIFY_CLIENT_SECRET } = process.env;

interface User {
  id: string;
  tokenManager: TokenManager;
}

const users: Array<User> = [];

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

/* eslint-disable-next-line consistent-return */
passport.deserializeUser((id, done) => {
  const user = users.find(_user => _user.id === id);

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
      callbackURL: 'http://localhost:4000/callback',
      scope: 'playlist-modify-public',
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
