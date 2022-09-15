/*CREACIÓN DE LA BASE DE DATOS*/
DROP DATABASE IF EXISTS `baseDigital`;
CREATE DATABASE `baseDigital`;
USE `baseDigital`;

/*CREACIÓN DE TABLAS*/
/*Productos: Información de los SKU disponibles en el inventario*/
CREATE TABLE productos
(
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto varchar(200),
    id_marca INT not null,
    id_talle INT not null,
    id_categoria INT not null,
    precio INT not null,
    imagen VARCHAR(200)
   );
/*Cargo la informacion a la tabla productos*/
INSERT INTO productos (id_producto,nombre_producto,id_marca,id_talle,id_categoria,precio,imagen) VALUES
(1,'camisa_1',2,2,2,1,'arsenal21-22'),
(2,'camisa_2',3,3,3,2,'argentina2022'),
(3,'camisa_3',2,3,4,3,'asd'),
(4,'camisa_4',3,2,4,4,'bayernMunchen'),
(5,'camisa_5',1,2,3,5,'camiseta-1662993522846'),
(6,'chomba_1',3,4,4,6,'camisetaArgentina'),
(7,'chomba_2',2,1,3,7,'camisetaColombia'),
(8,'chomba_3',4,4,1,8,'camisetaMexico'),
(9,'chomba_4',2,4,1,9,'logoDS'),
(10,'chomba_5',4,1,4,10,'logoDS22'),
(11,'musculosa_1',3,1,3,11,'manchesterUnited21-22'),
(12,'musculosa_2',2,4,1,12,'camiseta-1659538233508'),
(13,'musculosa_3',3,2,4,13,'camiseta-1659538352810'),
(14,'musculosa_4',3,3,3,14,'camiseta-1659538499437'),
(15,'musculosa_5',4,1,4,15,'camiseta-1659576660387'),
(16,'remera_1',2,1,3,16,'camiseta-1659577620648'),
(17,'remera_2',1,2,2,17,'camiseta-1660183897252'),
(18,'remera_3',3,3,3,18,'camiseta-1661951376501'),
(19,'remera_4',1,4,1,19,'camiseta-1662269573741'),
(20,'remera_5',3,3,3,20,'camiseta-1659538094277');
SELECT * FROM productos;


/*Marcas: Información de las marcas con las que se trabaja*/
CREATE TABLE marca
(
id_marca INT AUTO_INCREMENT PRIMARY KEY,
nombre_marca VARCHAR(40)
);
/*Cargo la informacion a la tabla marca*/
INSERT INTO marca (id_marca,nombre_marca) VALUES
(1,'adidas'),
(2,'nike'),
(3,'reebok'),
(4,'puma');
SELECT * FROM marca;


/*Talle: Información de los talles con los que se trabaja*/
CREATE TABLE talle
(
id_talle INT AUTO_INCREMENT PRIMARY KEY,
nombre_talle VARCHAR(40)

);
/*Cargo la informacion a la tabla talle*/
INSERT INTO talle (id_talle,nombre_talle) VALUES
(1,'S'),
(2,'M'),
(3,'L'),
(4,'XL');
SELECT * FROM talle;

/*Categoría: Información de las Categorías con los que se trabaja*/
CREATE TABLE categoria
(
id_categoria INT AUTO_INCREMENT PRIMARY KEY,
nombre_categoria VARCHAR(40)
);
/*Cargo la informacion a la tabla categoria*/
INSERT INTO categoria (id_categoria,nombre_categoria) VALUES
(1,'A'),
(2,'B'),
(3,'C'),
(4,'D');
SELECT * FROM categoria;


/*Usuarios: Información de los usuarios registrados*/
CREATE TABLE usuarios
(
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
mail VARCHAR(40),
pais VARCHAR(40),
pass VARCHAR(40),
fullname VARCHAR(40),
avatar VARCHAR(255)
);
/*Cargo la informacion a la tabla usuarios*/
INSERT INTO usuarios (id_usuario,mail,pais,pass,fullname,avatar) VALUES
(1,'ahann0@icq.com','Sweden','8e6qL234VF','Aime Hann','1609285636788_img'),
(2,'bedelston1@rediff.com','South Korea','LiN1JWX8e4N','Broderic Edelston','1659351524947_img'),
(3,'dbeyer2@theguardian.com','Sri Lanka','h64WOpPZ6rix','Danielle Beyer','1659351735234_img'),
(4,'dgauvin3@jalbum.net','Botswana','BBbrMclfYQvv','Dur Gauvin','1659363534502_img'),
(5,'jadel4@china.com.cn','Russia','twS6Y9o7w1','Jimmy Adel','1659538412605_img'),
(6,'rwalworche5@soup.io','Russia','qKdwwc','Ronni Walworche','1659576604766_img');
SELECT * FROM usuarios;

/*Carrito: Información del carrito de compras usado*/
CREATE TABLE carrito
(
id_carrito INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT not null,
id_producto INT not null,
qty_productos INT not null
);
/*Cargo la informacion a la tabla carrito*/
INSERT INTO carrito (id_carrito,id_usuario,id_producto,qty_productos)VALUES
(1,4,61,7),
(2,4,188,9),
(3,1,136,2),
(4,4,110,7),
(5,2,149,5),
(6,2,33,8),
(7,1,143,1),
(8,1,20,9),
(9,2,82,7);
SELECT * FROM carrito;