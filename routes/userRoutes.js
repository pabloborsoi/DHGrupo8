const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const { body } = require('express-validator');

// Controller
const usersController = require('../controllers/userController');

// Middlewares
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


//Configuracion de Multer
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/avatars"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const fotoUsuario = multer({ storage: multerDiskStorage });



///Validaciones de registro
//Express validator
const validacionesLogin = [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('El campo email no puede estar vacío.')
      .bail()
      .isEmail()
      .withMessage('Debe ser un email válido'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('El campo password no puede estar vacío.')
  ];
  const validacionesRegistro = [
    body("fullName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un nombre")
      .bail()
      .isLength({ min: 2 })
      .withMessage("El nombre debe contener al menos 2 caracteres."),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("El campo email no puede estar vacío.")
      .bail()
      .isEmail()
      .withMessage("Debe ser un email válido"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("El campo password no puede estar vacío.")
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "La contraseña debe tener 8 caracteres como mínimo y 20 como máximo"
      ),
    /*body("password2")
      .trim()
      .notEmpty()
      .withMessage("El campo password no puede estar vacío.")
      .bail()
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Las contraseñas deben coincidir");
        }
        return true;
      }),*/
      body('avatar')
      .custom((value, {req}) => {
        let file = req.file
        let extensionesValidas = ['.jpg','.jpeg','.png','.gif','.tiff']
  
        if(!file){
          throw new Error('Tenes que subir una imagen.')
        } else {
          let fileExtension = path.extname(file.originalname).toLowerCase()
          if(!extensionesValidas.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son: ${extensionesValidas.join(', ')}`)
          }
        }
        return true
      })
  ];

////////////////////////////CRUD SQL


//CREAR
router.get('/crear',authMiddleware, usersController.crear);
router.post('/crear', fotoUsuario.single("avatar"),usersController.guardado);

// Formulario de login
router.get('/login', usersController.login);
router.post('/login',guestMiddleware,usersController.procesarLogin);

// Perfil de Usuario
router.get('/perfil/:id', authMiddleware, usersController.perfil);

//LECTURA
router.get('/listado', usersController.listado);

//DETLLE
router.get('/:id', usersController.detalle);
//ACTUALIZACION
router.get('/editar/:id', usersController.editar);
router.put('/editar/:id', fotoUsuario.single("avatar"), usersController.actualizar);
//BORRADO
router.post('/borrar/:id', usersController.borrar);
//logout
router.get("/logout", usersController.logout);


module.exports = router;