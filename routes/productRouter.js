const express = require('express');
const productRouter = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');


// REQUERIMOS EL CONTROLADOR PARA DESPUES ACCEDER A SUS METODOS
const productController = require('../controllers/productController');
//Requerir el middleware Ruta Acceso
//const acceso = require(path.resolve(__dirname,'../middlewares/acceso'));

//middlewares import
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware")

//Como podemos indicar para subir el archivo nombre y donde guardarlo
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/camisetas"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
   
  const fotoProducto = multer({ storage: multerDiskStorage });
  
  const validacionesCrearProducto = [
    //entre parentesis se toma el Name
    body("nombre")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un nombre")
      .bail()
      .isLength({ min: 5 })
      .withMessage("El nombre debe contener al menos 5 caracter."),
    body("descripcion")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar una descripción")
      .bail()
      .isLength({ min: 20})
      .withMessage("La descripción debe contener al menos 20 caracteres."),
    body("precio")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un precio")
      .bail(),
    body('imagen')
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

  const validacionesEditarProducto = [
  //entre parentesis se toma el Name
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("Debes ingresar un nombre")
    .bail()
    .isLength({ min: 5 })
    .withMessage("El nombre debe contener al menos 5 caracter."),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("debes ingresar una descripción")
    .bail()
    .isLength({ min: 20})
    .withMessage("La descripción debe contener al menos 20 caracteres."),
  body("precio")
    .trim()
    .notEmpty()
    .withMessage("Debes ingresar un precio")
    .bail(),
  body('imagen')
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


// CONFIFURACION DE RUTAS Y METODOS
productRouter.get('/', productController.index);


///CRUD PRODUCTOS
//CREAR
productRouter.get('/crear',authMiddleware,productController.cargarProducto);
productRouter.post('/crear', fotoProducto.single("imagen"),productController.guardarProducto);
//LECTURA
productRouter.get('/listado',authMiddleware,productController.listado);
//DETALLE
productRouter.get('/:id',productController.detalle);
//ACTUALIZACION
productRouter.get('/editar/:id',authMiddleware,productController.editar);
productRouter.put('/editar/:id', productController.actualizar);
//BORRADO
productRouter.post('/borrar/:id', productController.borrar);



module.exports = productRouter;