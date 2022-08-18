const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Cuadro con usuarios
router.get('/indexUsers', usersController.indexUsers)

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, usersController.profile);

// Detalle Usuario
router.get('/detail/:id', usersController.detail);

// Editar Usuario
router.get('/edit/:id', usersController.edit);

//Guardar editar uduario
router.put("/edit/:id", usersController.processEdit)

//Eliminar usuario
router.delete("/delete/:id", usersController.destroy)

// Logout
router.get('/logout/', usersController.logout);

module.exports = router;