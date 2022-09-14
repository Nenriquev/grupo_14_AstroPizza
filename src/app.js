const express = require('express');
const path = require('path');
const indexRouter = require('./routers/index.js');
const productRouter = require('./routers/products.js');
const cartRouter = require('./routers/cart.js');


const app = express()


app.listen(3000, () =>{
  console.log("Servidor corriendo en el puerto 3000")
})

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));


/* INDEX */
app.use('/', indexRouter)


/*PRODUCTS */

app.use('/product', productRouter)


/*CART*/

app.use('/cart', cartRouter)

