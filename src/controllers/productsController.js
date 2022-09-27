const path = require('path');
const fs = require("fs");

function findAllProducts(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/products.json"))
  const data = JSON.parse(jsonData)
  return data
}

const productController = {
  products: (req, res) => {
    const data = findAllProducts();

    let dataPizzas = (data[0]).pizzas
    let dataQuesos = (data[1]).quesos
    let dataProteinas = (data[2]).proteinas
    let dataVegetales = (data[3]).vegetales
    let dataCervezas = (data[4]).cervezas
    let dataBebidas = (data[5]).bebidas

    res.render('./products/product_detail.ejs', { dataPizzas: dataPizzas,
                                                  dataQuesos: dataQuesos,
                                                  dataProteinas: dataProteinas,
                                                  dataVegetales: dataVegetales,
                                                  dataCervezas: dataCervezas,
                                                  dataBebidas: dataBebidas
                                                })

  },

  create: (req, res) => {
    res.render('./products/product_create.ejs')
  },

  store: (req, res) => {

    const data = findAllProducts()

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