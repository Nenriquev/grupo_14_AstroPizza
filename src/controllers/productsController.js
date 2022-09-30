const path = require('path');
const fs = require("fs");

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
      //CREAR//

  create: (req, res) => {
    res.render('./products/product_create.ejs')
  },

      
  store: (req, res) => {
    const data = findAllProducts()
    const newProduct = {
        id: String(data.length + 1),
        name: req.body.product_name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        status: '',
        image: req.file.filename
      }

      data.push(newProduct)
      writeData(data)
      res.redirect("/product/create");
  },

      //EDITAR//

  edit: (req, res) => {
    const data = findAllProducts()
    const status = ['Activo', 'Sin stock', 'Inactivo']
    const category = ['Pizzas', 'Quesos', 'Vegetales', 'Carnes', 'Bebidas', 'Cervezas', 'Aderezos', 'Postres']
    const product = data.find(element => element.id === req.params.id)
    res.render('./products/product_edit', {product: product, status: status, category: category})
  },
     
  update: (req, res) => {
      const data = findAllProducts();
      const product = data.find(element => element.id === req.params.id);

      product.name = req.body.product_name;
      product.description = req.body.description;
      product.price = Number(req.body.price);
      product.category = req.body.category;
      product.status = req.body.status;
      
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