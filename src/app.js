import express from 'express'
import indexRouter from './routers/index.js'


const app = express()

app.listen(3000, () =>{
  console.log("Servidor corriendo en el puerto 3000")
})

app.use(express.static('../public'))

/* INDEX */
app.use('/',indexRouter)

app.use('/tyc', indexRouter)

app.get('/product_detail', (req, res) => {
  res.sendFile(path.resolve('./views/product_detail.html'))
})




app.get('/carrito', (req, res) => {
  res.sendFile(path.resolve('./views/carrito.html'))
})


