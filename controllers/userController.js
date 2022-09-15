const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const fs = require ('fs');
let db = require ("../database/models");

const controller = {
	//MUESTRA EL PERFIL DEL USUARIO
	
	perfil: function (req, res) {
		db.Usuarios.findByPk(req.params.id)
		  .then((encontrado) => {
			if(encontrado!=undefined) {
			  res.render("user/perfil", { encontrado });
			}
		   else {
			res.render("error404")
		   }
		  })
		  .catch((error) => res.send(error));
	  },
	//MUESTRA LA VISTA DE LOGIN
	login: function (req, res) {
		res.render("login");
	},
	
	//PROCESA EL LOGIN DE USUARIO
	procesarLogin: function (req, res) {
		//VALIDACION BACKEND
		const resultValidation = validationResult(req);
	  
		if (resultValidation.errors.length > 0) {
		  return res.render("login", {
			errors: resultValidation.mapped(),
			oldData: req.body,
		  });
		}
	  
		//sequelize ENCONTRAR USUARIO POR MAIL
		db.Usuarios.findOne({
		  where: { mail: req.body.mail },
		})
		  .then((encontrado) => {
			//VALIDACION DEL MAIL CONTRA LA BASE
			if (encontrado == null) {
			  let mensajeError = "El mail no está registrado";
			  res.render("login", { mensajeError });
			} else if (
			  encontrado.id_usuario != undefined &&
			  bcrypt.compareSync(req.body.pass, encontrado.pass)
			) {
			  //LOGUEO EXITOSO
			  req.session.usuarioLogueado = encontrado;
			  // (si el checkbox de recordar usuario no está tildado, debería llegar como "undefined")
			  if (req.body.recordarClave != undefined) {
				res.cookie('recordame',
				encontrado.id_usuario,
				{maxAge:6000000})
			  }
			  res.redirect("/perfil");
			} else {
			  // LOGUEO ERRONEO
			  let mensajeError = "Usuario o clave incorrectos ";
			  res.render("login", { mensajeError });
			}
		  })
		  .catch((error) => res.send(error));
	  },

	  //DESLOGUEA AL USUARIO
	  logout: function (req, res) {
		res.clearCookie('recordame');
		req.session.destroy();
		return res.redirect("/login");
	  },

	  // RENDERIZA LA VISTA DE CREAR UN USUARIO NUEVO
		crear: function (req, res) {
			res.render('creacionUsuarios');
		},

		//PROCESA LA CREACION DE UN USUARIO NUEVO
		guardado: function (req, res) {
			const resultValidation = validationResult(req);
	
		if (resultValidation.errors.length > 0) {
		  return res.render("creacionUsuarios", {
			errors: resultValidation.mapped(),
			oldData: req.body,
		  });
		}
			db.Usuarios.create({
				//nombre de las columnas de las bases de dato(ingles)
				//nombres req.body.(name del formulario)
				fullname: req.body.fullname,
				mail: req.body.mail,
				pais: req.body.pais,
				pass: bcrypt.hashSync(req.body.pass, 10),
				avatar: req.file.filename,
			})
			.then(() => {
				return res.redirect("/user/listado");
			  })
			  .catch((error) => res.send(error));
		  },

		//MUESTRA LA VISTA DE EDICION DE USUARIO
		editar: function (req, res) {
			db.Usuarios.findByPk(req.params.id)
			  .then((encontrado) => {
				res.render("editarUsuario", { encontrado });
			  })
			  .catch((error) => res.send(error));
		  },

		  //PROCESA LA EDICION DE UN USUARIO 
	

	
	
	listado: function(req,res){
		
		db.Usuarios.findAll()
		.then(function(usuarios){
			
			res.render("listadoUsuarios", {usuarios:usuarios}) 
	})
	},
	


	detalle: function (req, res) {
		//ByPk sale del id de la url
		db.Usuarios.findByPk(req.params.id, {
			//los nombres son de las relaciones (as)
			include: [{association: "carrito"}]
		})
			.then(function(usuario){
				res.render('detalleUsuarios', {usuario:usuario});
			})
		},
		  //MUESTRA LA VISTA DE EDICION DE USUARIO
		editarOriginal: function (req, res) {
			//toma el id del url
		let pedidoUsuario = db.Usuarios.findByPk(req.params.id);
//			let pedidoTalle = db.Talle.findAll();
	        Promise.all([pedidoUsuario])
//			.then(function([producto, talle]) {
			.then(function(usuario) {
				res.render('editarUsuario', {usuario:usuario});
			})
		},
		  //MUESTRA LA VISTA DE EDICION DE USUARIO
		

		  //PROCESA LA EDICION DE UN USUARIO 
		  actualizar: function (req, res) {
			let idEditado = req.params.id;
		
			db.Usuarios.findByPk(idEditado)
			  .then((encontrado) => {
				//si el usuario seleccionó una foto nueva
				if (req.file != undefined) {
				  db.Usuarios.update(
					{
						fullname: req.body.fullname,
						mail: req.body.mail,
						pais: req.body.pais,
						//pass: req.body.pass,
						avatar: req.file.filename,
					},
					{
					  where: { id_usuario: idEditado },
					}
				  )
					.then(() => {
					  res.redirect("/user/listado");
					})
					.catch((error) => res.send(error));
				}
				//si el usuario no seleccionó ninguna foto nueva
				else {
				  db.Usuarios.update(
					{
						fullname: req.body.fullname,
						pais: req.body.pais,
						mail: req.body.mail,
						//pass: req.body.pass
						avatar: encontrado.avatar,
					},
					{
					  where: { id_usuario: idEditado },
					}
				  )
				  .then(() => {
					res.redirect("/user/listado");
				  })
				  .catch((error) => res.send(error));
				}
			  })
			  .catch((error) => res.send(error));
		  },


		   //PROCESA EL BORRADO DEL USUARIO 
		   borrar: function (req, res) {
			let usuarioBorrado = req.params.id;
			db.Usuarios.destroy({
			  where: { id_usuario: usuarioBorrado },
			  force: true,
			})
			  .then(() => {
				if (req.params.id == req.session.usuarioLogueado.id_usuario) {
				  res.clearCookie('recordame');
				  req.session.destroy();
				}
				return res.redirect("/listadoUsuarios");
			  })
			  .catch((error) => res.send(error));
		},

  

		actualizarOriginal: function (req, res) {
			db.Usuarios.update({
				//nombre de (izquiera)las columnas de las bases de dato(ingles)
				//nombres req.body.(name del formulario)
			fullname: req.body.fullname,
			pais: req.body.pais,
			mail: req.body.mail,
			pass: req.body.pass
			//FALTA AVATAR
			}, {
			where: {
				id: req.params.id
			}
			});
	
			res.redirect('/' + req.params.id)
		},
		
}

module.exports = controller;