const axios = require('axios');
const { DateTime } = require('luxon');
const querystring = require('querystring');

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

class TokenManager {
  constructor(accessToken, refreshToken, expiresIn) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expirationTime = DateTime.local().plus({ seconds: expiresIn });
  }

  isExpired() {
    return DateTime.local() >= this.expirationTime;
  }

  getAccessToken() {
    return this.accessToken;
  }

  refresh() {
    axios.post(
      SPOTIFY_TOKEN_URL,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: `${this.refreshToken}`,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }
}

module.exports = TokenManager;
