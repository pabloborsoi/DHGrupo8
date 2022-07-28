const express = require('express');
const productRouter = express.Router();
const path = require('path');

// REQUERIMOS EL CONTROLADOR PARA DESPUES ACCEDER A SUS METODOS
const productController = require('../controllers/productController');

// CONFIFURACION DE RUTAS Y METODOS
productRouter.get('/cart', productController.cart);
productRouter.get('/product', productController.product);

module.exports = productRouter;