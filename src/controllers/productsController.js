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

    res.render('product_detail.ejs', { dataQuesos: dataQuesos, 
                                       dataVegetales: dataVegetales, 
                                       dataProteinas: dataProteinas,
                                       dataBebida: dataBebida,
                                       dataCerveza: dataCerveza})
  },

}

module.exports = productController;