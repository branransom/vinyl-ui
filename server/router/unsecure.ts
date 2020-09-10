import Router from '@koa/router';

import requireSignIn from '../middleware/requireSignIn';

const router = new Router();

router.get('/login', requireSignIn);

router.get('/callback', requireSignIn, async ctx => {
  const { user } = ctx.state;

  if (!user) {
    ctx.redirect('/login');
  }

  ctx.redirect('/');
});

export default router;
