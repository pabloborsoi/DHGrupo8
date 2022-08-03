const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const controllersAdmin = require(path.resolve(__dirname,'../controllers/controllerAdmin'));
//Requerir el middleware Ruta Acceso
//const acceso = require(path.resolve(__dirname,'../middlewares/acceso'));

//Como podemos indicar para subir el archivo nombre y donde guardarlo
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/images/camisetas'));
    },
    filename: function (req, file, cb) {
      cb(null, 'camiseta-'+Date.now()+path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage })

//router.get('/administrar', acceso, controllersAdmin.index);
//router.get('/administrar/create', controllersAdmin.create);
router.post('/create', upload.single('imagen'), controllersAdmin.save);
router.get('/detail/:id', controllersAdmin.show);
router.get('/edit/:id', controllersAdmin.edit);
router.put('/edit/:id', upload.single('imagen'), controllersAdmin.update);
router.get('/delete/:id', controllersAdmin.destroy);

module.exports = router;