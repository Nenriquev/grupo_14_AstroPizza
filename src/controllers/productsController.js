const path = require('path');
const fs = require("fs");

function findAllQuesos(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/product_detail_data/extras_quesos.json"))
  const data = JSON.parse(jsonData)
  return data
}

function findAllVegetales(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/product_detail_data/extras_vegetales.json"))
  const data = JSON.parse(jsonData)
  return data
}

function findAllProteinas(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/product_detail_data/extras_proteinas.json"))
  const data = JSON.parse(jsonData)
  return data
}

function findAllBebida(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/product_detail_data/extras_bebidas.json"))
  const data = JSON.parse(jsonData)
  return data
}

function findAllCerveza(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/product_detail_data/extras_cervezas.json"))
  const data = JSON.parse(jsonData)
  return data
}

const productController = {
  products: (req, res) => {
    const dataQuesos = findAllQuesos();
    const dataVegetales = findAllVegetales();
    const dataProteinas = findAllProteinas();
    const dataBebida = findAllBebida();
    const dataCerveza = findAllCerveza();

    res.render('./products/product_detail.ejs', { dataQuesos: dataQuesos, 
                                       dataVegetales: dataVegetales, 
                                       dataProteinas: dataProteinas,
                                       dataBebida: dataBebida,
                                       dataCerveza: dataCerveza})
  },

  create: (req, res) => {
    res.render('./products/product_create.ejs')
  },

  store: (req, res) => {

    const data = findAllBebida()

    const newProduct = {
        id: b + data.length + 1,
        name: req.body.product_name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
      }

      console.log(newProduct)
      res.redirect("/product/create");
  },

  edit: (req, res) => {
    res.render('./products/product_edit.ejs')
  },
}

module.exports = productController;