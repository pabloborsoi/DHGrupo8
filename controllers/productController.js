const res = require('express/lib/response');
const path = require('path');
const fs = require ('fs');
const { Op } = require("sequelize");
let db = require ("../database/models");

const productController = {
    cart: function (req, res) {
        res.render('cart');
    },
    create: function (req, res) {
        res.render('product-create');
    },
    listado:function(req,res){

		db.Productos.findAll()
        .then(function(productos){
            
            res.render("listadoProductos", {productos:productos}) 
})
}

};
    

module.exports = productController;