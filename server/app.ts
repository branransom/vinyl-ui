import './auth/passport';
import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import cors from '@koa/cors';

import { secureRouter, unsecureRouter } from './router';
import requireAuth from './middleware/requireAuth';

const app = new Koa();

const errorHandler = async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};

app.keys = ['very secret'];

app
  .use(errorHandler)
  .use(bodyParser())
  .use(cors())
  .use(session({}, app))
  .use(passport.initialize())
  .use(passport.session())
  .use(unsecureRouter.routes())
  .use(unsecureRouter.allowedMethods())
  .use(requireAuth)
  .use(serve(path.resolve(__dirname, '..', 'dist')))
  .use(secureRouter.routes())
  .use(secureRouter.allowedMethods());

app.on('error', err => {
  console.log('Server error occurred: ', err);
});

export default app;
