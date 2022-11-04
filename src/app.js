const express = require('express');
const path = require('path');
const indexRouter = require('./routers/index.js');
const productRouter = require('./routers/products.js');
const cartRouter = require('./routers/cart.js');
const usersRouter = require('./routers/users.js');
const methodOverride = require("method-override");
const session = require('express-session');
const cookieParser = require('cookie-parser')
const localsMiddleware = require('./middlewares/localsMiddle');
const recordameMiddleware = require('./middlewares/recordameMiddle');


const app = express();


/* CONFIGURACÍON */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({secret: "Secreto", resave: true, saveUninitialized: true}));
app.use(cookieParser());
app.use(recordameMiddleware)
app.use(localsMiddleware);


/* INDEX */
app.use('/', indexRouter);


/*PRODUCTS */

app.use('/product', productRouter);

/* USERS */

app.use('/users', usersRouter);


/*CART*/

app.use('/cart', cartRouter);

/* ERRORS PAGE*/
app.use(function(req, res){
  res.status(404).send('ERROR 404');
});


app.use(function(error, req, res, next) {
  res.status(500).send('ERROR 500');
  console.log(error)
});


/* SERVER */
app.listen(3000, () =>{
  console.log("Servidor corriendo en el puerto 3000")
})
