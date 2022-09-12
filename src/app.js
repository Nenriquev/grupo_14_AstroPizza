import express from 'express'
import path from 'path'
import indexRouter from './routers/index.js'
import productRouter from './routers/products.js'
import cartRouter from './routers/cart.js'


const app = express()


app.listen(3000, () =>{
  console.log("Servidor corriendo en el puerto 3000")
})

app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');

app.use(express.static('../public'))

/* INDEX */
app.use('/', indexRouter)


/*PRODUCTS */

app.use('/', productRouter)


/*CART*/

app.use('/', cartRouter)

