require('dotenv').config();
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const cors = require('@koa/cors');

require('./auth/passport');
const { secureRouter, unsecureRouter } = require('./router');
const { requireAuth } = require('./middleware/requireAuth');

const app = new Koa();

const errorHandler = async (ctx, next) => {
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
