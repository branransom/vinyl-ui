const requireAuth = async (ctx, next) => {
  if (!ctx.isAuthenticated() || !ctx.state.user) {
    ctx.redirect('/login');
    return;
  }

  const { tokenManager } = ctx.state.user;

  if (tokenManager.isExpired()) {
    tokenManager.refresh();
  }

  return next();
};

module.exports = { requireAuth };
