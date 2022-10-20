const path = require('path');
const fs = require("fs");
const {validationResult} = require('express-validator');


function findAllProducts(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/products.json"))
  const data = JSON.parse(jsonData)
  return data
}

const writeData = (data) =>{
  const dataString = JSON.stringify(data, null, 4)
  fs.writeFileSync(path.join(__dirname, '../data/products.json'), dataString)
}


const productController = {
  product: (req, res) => {
    const data = findAllProducts();

    const pizzaData = data.find(element => element.value === req.params.value);

    const dataQuesos = data.filter(x => x.category == "quesos");
    const dataVegetales = data.filter(x => x.category == "vegetales");
    const dataProteinas = data.filter(x => x.category == "carnes");
    const dataBebidas = data.filter(x => x.category == "bebidas");
    const dataCervezas = data.filter(x => x.category == "cervezas");

    req.session.pizza = req.params.value
    res.render('./products/product_detail.ejs', {
                                                  pizzaData: pizzaData,
                                                  dataQuesos: dataQuesos,
                                                  dataVegetales: dataVegetales,
                                                  dataProteinas: dataProteinas,
                                                  dataBebidas: dataBebidas,
                                                  dataCervezas: dataCervezas,
                                                })
},

  create: (req, res) => {
    res.render('./products/product_create.ejs')
  },

      
  store: (req, res) => {
    const validationErrors = validationResult(req)
    const data = findAllProducts()
    console.log(validationErrors)
    console.log(req.file)
    
    if(!validationErrors.isEmpty()){
     return res.render('./products/product_create.ejs', {errors: validationErrors.mapped(), old: req.body})
    }

    const newProduct = {
        id: String(data.length + 1),
        name: req.body.product_name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        status: '',
        image: req?.file?.filename
      }
      
      data.push(newProduct)
      writeData(data)
      res.redirect("/product/create");
    },

      //EDITAR//

  edit: (req, res) => {
    const errors = validationResult(req)
    const data = findAllProducts()
    const status = ['Activo', 'Sin stock', 'Inactivo']
    const category = ['Pizzas', 'Quesos', 'Vegetales', 'Carnes', 'Bebidas', 'Cervezas', 'Aderezos', 'Postres']
    const product = data.find(element => element.id === req.params.id)
    return res.render('./products/product_edit', {product: product, status: status, category: category, validationErrors: errors.mapped()})
  },
     
  update: (req, res) => {
      const errors = validationResult(req)
      const data = findAllProducts();
      const product = data.find(element => element.id === req.params.id);

      if(!errors.isEmpty()){
       return productController.edit(req, res)
      }

      product.name = req.body.product_name;
      product.description = req.body.description;
      product.price = Number(req.body.price);
      product.category = req.body.category;
      product.status = req.body.status;
      product.image = req.file?.filename ? req.file.filename : null
      
      writeData(data)
      res.redirect('/')
      
    },

    delete: (req, res) => {
      const data = findAllProducts();
      const product = data.filter(element => element.id !== req.params.id);

      writeData(product)
      res.redirect('/')
      
    },
}

module.exports = productController;