const express = require('express');
const path = require('path');
const indexRouter = require('./routers/index.js');
const productRouter = require('./routers/products.js');
const cartRouter = require('./routers/cart.js');
const methodOverride = require("method-override");

const app = express()


app.listen(3000, () =>{
  console.log("Servidor corriendo en el puerto 3000")
})

/* CONFIGURACÍON */
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* INDEX */
app.use('/', indexRouter)


/*PRODUCTS */

app.use('/product', productRouter)


/*CART*/

app.use('/cart', cartRouter)

