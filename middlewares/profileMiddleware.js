function profileMiddleware(req, res, next) {
    if (res.locals.usuarioLogueado.id_usuario){
      return res.redirect(`/user/perfil/${res.locals.usuarioLogueado.id_usuario}`)
    }
    next();
  }
  module.exports = profileMiddleware;