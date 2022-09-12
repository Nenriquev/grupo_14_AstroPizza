import express from 'express'
import indexRouter from './routers/index.js'
import path from 'path'
import productRouter from './routers/products.js'


const app = express()


app.listen(3000, () =>{
  console.log("Servidor corriendo en el puerto 3000")
})

app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');

app.use(express.static('../public'))

/* INDEX */
app.use('/',indexRouter)


/*PRODUCTS */

app.use('/', productRouter)


