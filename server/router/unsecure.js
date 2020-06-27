const Router = require('@koa/router');

const { requireSignIn } = require('../middleware/requireSignIn');

const router = new Router();

router.get('/login', requireSignIn);

router.get('/callback', requireSignIn, async ctx => {
  const { user } = ctx.state;

  if (!user) {
    ctx.redirect('/login');
  }

  ctx.redirect('/');
});

module.exports = router;
