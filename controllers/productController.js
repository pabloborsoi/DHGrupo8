const path = require('path');
const fs = require ('fs');
const db = require ("../database/models");
const { validationResult } = require('express-validator');

const rutaProductos = path.join(__dirname, "../database/camisetas.json");
let productos = JSON.parse(fs.readFileSync(rutaProductos, "utf-8"));


const productController = {
    ///////// Llamada al JSON
    index: (req,res) =>{
        let camisetas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/camisetas.json')));
        res.render(path.resolve(__dirname, '../views/index'), {camisetas});
    },
   



    //////////////////////CRUD PRODUCTOS SQL
    



    cargarProducto: function (req, res) {
    //sale del alias Genero, muestra todos los generos
    let promMarca = db.Marca.findAll();
    let promTalle = db.Talle.findAll();
    let promCategoria = db.Categoria.findAll();
    Promise.all([promMarca, promTalle, promCategoria])
    .then(([marca, talle, categoria]) => {
        return res.render("creacionProductos", {
            marca,
            talle,
            categoria,
        });
    })
    .catch((error) => res.send(error));
    },


    guardarProducto: function (req, res) {
        const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        let promMarca = db.Marca.findAll();
        let promTalle = db.Talle.findAll();
        let promCategoria = db.Categoria.findAll();
        Promise.all([promMarca, promTalle, promCategoria])
            .then(([marca, talle, categoria]) => {
                return res.render("creacionProductos", {
                    marca,
                    talle,
                    categoria,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                });
            })
            .catch((error) => res.send(error));
        } else if (resultValidation.errors.length == 0)
        db.Productos.create({
            //nombre de las columnas de las bases de dato(ingles)
            //nombres req.body.(name del formulario)
        nombre_producto: req.body.nombre,
        id_marca: req.body.marca,
        id_talle: req.body.talle,
        id_categoria: req.body.categoria,
        precio: req.body.precio,
        imagen: req.file.filename,
    },
    {
        where: {
            id_producto: req.params.id
        }
    })    
    .then(() => {
    res.redirect("/listado");
    })
    .catch((error) => res.send(error));
    },


    listado:function(req,res){

    db.Productos.findAll()
    .then(function(productos){
        
        res.render("listadoProductos", {productos:productos}) 
    })
    },
    detalle: function (req, res) {
    //ByPk sale del id de la url
    console.log('id: ',req.params.id);
    db.Productos.findByPk(req.params.id, {
        
        //los nombres son de las relaciones (as)
        include: ["marca", "talle", "categoria"],
    })
    .then((encontrado) => {
        if (encontrado!= undefined){
          res.render("detalleProducto.ejs", { encontrado });
        }
       else {
        res.render("error404")
       }
      })
      .catch((error) => res.send(error));
    },
    editar: function (req, res) {
        //toma el id del url
        console.log('id', req.params.id);
        let productoId = req.params.id;
        let pedidoProducto = db.Productos.findByPk(productoId, {
            include: ["marca", "categoria", "talle"],
        });

        let pedidoMarca = db.Marca.findAll();
        let pedidoCategoria = db.Categoria.findAll();
        let pedidoTalle = db.Talle.findAll();

        Promise.all([pedidoProducto, pedidoMarca, pedidoCategoria, pedidoTalle,])
        .then(([producto, marca, categoria, talle]) => {
            return res.render("editarProducto", {
              producto,
              marca,
              categoria,
              talle,
            });
          })
          .catch((error) => res.send(error));
    },
    editarOriginal: function (req, res) {
        //toma el id del url
        console.log('id', req.params.id);
        let promProducto = db.Productos.findByPk(req.params.id);

        let promTalle = db.Talle.findAll();
        let promMarca = db.Marca.findAll();
        let promCategoria = db.Categoria.findAll();

        Promise.all([promProducto, promTalle, promMarca, promCategoria])
        .then(function([producto, talle, marca, categoria]) {
            res.render('editarProducto', {producto:producto, talle:talle, marca:marca, categoria:categoria});
        })
    },
    actualizar: function (req, res) {
        let idEditado = req.params.id;
        const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
        let promProducto =db.Productos.findByPk(idEditado, {
            include: ["marca", "talle", "categoria"],
        });
        let promMarca = db.Marca.findAll();
        let promTalle = db.Talle.findAll();
        let promCategoria = db.Categoria.findAll();
        Promise.all([promProducto, promMarca, promTalle, promCategoria])
            .then(([producto, marca, talle, categoria]) => {
                return res.render("editarProductos", {
                    producto,
                    marca,
                    talle,
                    categoria,
                    precio,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                });
            })
            .catch((error) => res.send(error));
        } else if (resultValidation.errors.length == 0)
        db.Productos.update({
        //nombre de las columnas de las bases de dato(ingles)
        //nombres req.body.(name del formulario)
        nombre_producto: req.body.producto,
        id_marca: req.body.marca,
        id_talle: req.body.talle,
        id_categoria: req.body.categoria,
        precio: req.body.precio,
        }, {
        where: {id_producto: idEditado},
    }
    )
    .then(() => {
        return res.redirect("/product/listado");
      })
      .catch((error) => res.send(error));
    },



    actualizarOriginal: function (req, res) {
        let idEditado = req.params.id;
        const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
        let promProducto =db.Productos.findByPk(idEditado, {
            include: ["marca", "talle", "categoria"],
        });
        let promMarca = db.Marca.findAll();
        let promTalle = db.Talle.findAll();
        let promCategoria = db.Categoria.findAll();
        Promise.all([promProducto, promMarca, promTalle, promCategoria])
            .then(([producto, marca, talle, categoria]) => {
                return res.render("product/editarProductos", {
                    producto,
                    marca,
                    talle,
                    categoria,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                });
            })
            .catch((error) => res.send(error));
        } else if (resultValidation.errors.length == 0)
        db.Productos.update({
        //nombre de las columnas de las bases de dato(ingles)
        //nombres req.body.(name del formulario)
        //id_producto: req.body.producto,
        id_marca: req.body.marca,
        id_talle: req.body.talle,
        id_categoria: req.body.categoria,
        precio: req.body.precio
        }, {
        where: {
            id_producto: idEditado
        },
    });
    console.log('VER ACAAAAAAA', id_producto);

        //res.redirect('/product/productos/' + req.params.id)
        res.redirect('/product/listado');
    },
    
    borrar: function(req, res) {
        db.Productos.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/product/listado');
    },
    

};
    

module.exports = productController;