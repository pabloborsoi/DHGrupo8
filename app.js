const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express();
const publicPath = path.resolve (__dirname, "./public")
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use (express.static(publicPath))
app.use (cookieParser())
app.use(userLoggedMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(4000, () => console.log('Servidor levantado en el puerto 4000'));

// Template Engine
app.set('view engine', 'ejs');
app.set ('views', path.join(__dirname, './views'));

// Routers
const userRoutes = require('./routes/userRoutes');
const productRouter = require ('./routes/productRouter');
const apiRouter = require("./routes/apiRouter")
const error404Controller = require("./controllers/error404Controller")

app.use('/', productRouter);
app.use('/product',productRouter);
app.use('/user', userRoutes);
app.use('/api', apiRouter);
app.use('*', error404Controller.error404);
