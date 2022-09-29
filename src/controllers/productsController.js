const path = require('path');
const fs = require("fs");

function findAllProducts(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/products.json"))
  const data = JSON.parse(jsonData)
  return data
}

const productController = {
  product: (req, res) => {
    const data = findAllProducts();

    dataPizza = data.filter(x => x.category == "pizza");
    const pizzaEncontrada = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
  
    indicePizza = dataPizza.findIndex(x => x.name == pizzaEncontrada.pizza);
    pizzaElegida = dataPizza[indicePizza];

    dataQuesos = data.filter(x => x.category == "quesos");
    dataVegetales = data.filter(x => x.category == "vegetales");
    dataProteinas = data.filter(x => x.category == "proteinas");
    dataBebidas = data.filter(x => x.category == "bebidas");
    dataCervezas = data.filter(x => x.category == "cervezas");

    res.render('./products/product_detail.ejs', {
                                                  dataQuesos: dataQuesos,
                                                  dataVegetales: dataVegetales,
                                                  dataProteinas: dataProteinas,
                                                  dataBebidas: dataBebidas,
                                                  dataCervezas: dataCervezas,
                                                  pizzaElegida: pizzaElegida
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
  cart: (req, res) => {
    res.render('cart.ejs')
  },

}


module.exports = productController;