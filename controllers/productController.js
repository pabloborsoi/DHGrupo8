const res = require('express/lib/response');
const path = require('path');
const fs = require ('fs');

const productController = {
    cart: function (req, res) {
        res.render('cart');
    },
    create: function (req, res) {
        res.render('create');
    }
};

module.exports = productController;