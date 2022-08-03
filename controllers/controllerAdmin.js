const path = require('path');
const fs = require('fs');

module.exports = {
    index: (req,res) =>{
        let camisetas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/camisetas.json')));
        res.render(path.resolve(__dirname, '../views/admin/administrar'), {camisetas});
    },
    create: (req,res) =>{
        let camisetas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/camisetas.json')));
        res.render(path.resolve(__dirname, '../views/create'));
    },
    save: (req,res) =>{
        let camisetas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/camisetas.json')));
        let ultimaCamiseta = camisetas.pop();
        camisetas.push(ultimaCamiseta);
        console.log();
        let nuevoProducto = {
            id: ultimaCamiseta.id +1,
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            descuento: req.body.descuento,
            imagen: req.file.filename
        }

        camisetas.push(nuevoProducto);
        let nuevoProductoGuardar = JSON.stringify(camisetas,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/camisetas.json'), nuevoProductoGuardar);
        res.redirect('/');
    },
    show: (req,res) =>{
        let camisetas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/camisetas.json')));
        let miCamiseta;
        camisetas.forEach(camiseta => {
            if(camiseta.id == req.params.id){
                miCamiseta = camiseta;
            }
        });
        res.render(path.resolve(__dirname, '../views/detail'), {miCamiseta})

    },
    edit: (req,res)=>{
        let camisetas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/camisetas.json')));
        const modoId = req.params.id;
        let camisetaEditar = camisetas.find(camiseta=> camiseta.id == modoId);
        res.render(path.resolve(__dirname,'../views/edit'), {camisetaEditar});
    },
    update: (req,res) =>{
        let camisetas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/camisetas.json')));
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        let camisetasUpdate = camisetas.map(camiseta =>{
            if(camiseta.id == req.body.id){
                return camiseta = req.body;
            }
            return camiseta;
        })
        let camisetaActualizar = JSON.stringify(camisetasUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/camisetas.json'),camisetaActualizar)
        res.redirect('/');
    },
    destroy: (req,res) =>{
        let camisetas = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/camisetas.json')));
        const camisetaDeleteId = req.params.id;
        const camisetasFinal = camisetas.filter(camiseta => camiseta.id != camisetaDeleteId);
        let camisetasGuardar = JSON.stringify(camisetasFinal,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../database/camisetas.json'),camisetasGuardar);
        res.redirect('/');
    }








}