function guestMiddleware(req, res, next) {
	if (req.session.usuarioLogueado) {
	  return res.redirect(
		"/user/perfil/" + req.session.usuarioLogueado.id_usuario
	  );
	}
	next();
  }
  module.exports = guestMiddleware;
  