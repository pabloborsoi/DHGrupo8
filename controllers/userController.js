const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const fs = require ('fs');
const path = require('path');
const User = require('../models/User');
const { Op } = require("sequelize");
const { log } = require('console');
const users = User.findAll();

const controller = {
	indexUsers: function (req, res) {
		const users = User.findAll();
		return res.render('indexUsers',{users});
	},
	register: (req, res) => {
		return res.render('userRegisterForm');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('userRegisterForm', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('userRegisterForm', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/user/login');
	},
	login: (req, res) => {
		return res.render('userLoginForm');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('userLoginForm', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('userLoginForm', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	edit: (req, res) => {
        // 1- CAPTURAMOS EL ID
        // 2- RECORREMOS LOS USUARIOS Y BUSCAMOS LA COINCIDENCIA
        // 3- RENDERIZAMOS LA VISTA CON EL USUARIO QUE COINCIDE
        const idParam = req.params.id;
        let userSelected = null
        users.forEach(user => {
            if (user.id == idParam) {
                return userSelected = user
            }
        })
		res.render("editUsers", {user: userSelected});
	},
    processEdit: (req, res) => {
        // 1- CAPTURAMOS EL ID
        // 2- CAPTURAMOS LA DATA INGRERSADA POR EL USUARIO
        // 3- DEFINIMOS LA NUEVA VARIABLE CON LO QUE INGRESO EL USUARIO
        // 4- EDITAMOS EL ELEMENTO CON IDPARAMS - 1 CON EL VALOR DE LA VARIABLE 
        // 5- REDIRIGIMOS AL INDEX
        const idParam = req.params.id;
        const data = req.body;
		let userEdited = {
            id: idParam,
			...data,
		};
		users[idParam - 1] = userEdited;
        res.redirect('/')
    },
	detail: (req, res) => {
        // 1- CAPTURAMOS EL ID
        // 2- RECORREMOS LOS USUARIOS Y BUSCAMOS LA COINCIDENCIA
        // 3- RENDERIZAMOS LA VISTA CON EL USUARIO QUE COINCIDE
        const idParam = req.params.id;
        let userSelected = null
        users.forEach(user => {
            if (user.id == idParam) {
                return userSelected = user
            }
        })

		res.render("detailUsers", {user: userSelected});
	},
	profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},
	delete: (req, res) => {
        const idParam = req.params.id;
        let usersArray = users.filter(user => user.id != idParam);
        // res.redirect("/")
        res.render('indexUsers', {users: usersArray })
    },
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	destroy: (req,res) =>{
        let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        const usuariosDeleteId = req.params.id;
        const usuariosFinal = usuarios.filter(usuarios => usuarios.id != usuariosDeleteId);
        let usuariosGuardar = JSON.stringify(usuariosFinal,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'),usuariosGuardar);
        res.redirect('/');
		console.log();
    }
}

module.exports = controller;