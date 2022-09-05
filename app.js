import express from 'express'
import path from 'path'


const app = express()

app.listen(3000, () =>{
  console.log("Servidor corriendo en el puerto 3000")
})

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./views/index.html'))
})

app.get('/product_detail', (req, res) => {
  res.sendFile(path.resolve('./views/product_detail.html'))
})


app.get('/index2', (req, res) => {
  res.sendFile(path.resolve('./views/index2.html'))
})

app.get('/carrito', (req, res) => {
  res.sendFile(path.resolve('./views/carrito.html'))
})
