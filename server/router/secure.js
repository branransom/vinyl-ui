const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const Router = require('@koa/router');

const { requireAuth } = require('../middleware/requireAuth');

const router = new Router();

router.get('/me', requireAuth, async ctx => {
  const { tokenManager } = ctx.state.user;

  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${tokenManager.getAccessToken()}`,
    },
  });

  ctx.body = `Hello ${response.data.display_name}! Your user profile can be found at ${response.data.href}`;
});

router.get('/albums/:id', requireAuth, async ctx => {
  const { tokenManager } = ctx.state.user;

  const response = await axios.get(
    `https://api.spotify.com/v1/albums/${ctx.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${tokenManager.getAccessToken()}`,
      },
    }
  );

  ctx.body = response.data;
});

router.get('*', requireAuth, async ctx => {
  ctx.type = 'html';
  ctx.body = await fs.readFile(
    path.resolve(__dirname, '..', '..', 'dist', 'index.html')
  );
});

module.exports = router;
