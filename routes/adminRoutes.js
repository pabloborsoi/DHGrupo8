const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const controllerAdmin = require(path.resolve(__dirname,'../controllers/controllerAdmin'));
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

router.get('/administrar', controllerAdmin.index);
router.get('/create', controllerAdmin.create);
router.post('/create', upload.single('imagen'), controllerAdmin.save);
router.get('/detail/:id', controllerAdmin.show);
router.get('/edit/:id', controllerAdmin.edit);
router.put('/edit/:id', upload.single('imagen'), controllerAdmin.update);
router.get('/delete/:id', controllerAdmin.destroy);

module.exports = router;