import Koa from 'koa';

const requireAuth = async (ctx: Koa.Context, next: Function) => {
  if (!ctx.isAuthenticated() || !ctx.state.user) {
    ctx.redirect('/login');
    return next();
  }

  const { tokenManager } = ctx.state.user;

  if (tokenManager.isExpired()) {
    tokenManager.refresh();
  }

  return next();
};

export default requireAuth;
