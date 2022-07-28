const res = require('express/lib/response');
const path = require('path');
const fs = require ('fs');

const productController = {
    cart: function (req, res) {
        res.render('cart');
    },
    product: function (req, res) {
        res.render('product');
    }
};

module.exports = productController;