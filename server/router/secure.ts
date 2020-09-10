import path from 'path';
import { promises as fs } from 'fs';
import axios from 'axios';
import Router from '@koa/router';

import requireAuth from '../middleware/requireAuth';

interface Query {
  q: string;
  type: string;
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

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

router.get('/search', requireAuth, async ctx => {
  const { tokenManager } = ctx.state.user;

  const { query }: { query: Query } = ctx.request;

  const queryString = Object.entries(query)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  const response = await axios.get(
    `https://api.spotify.com/v1/search?${queryString}`,
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

export default router;
