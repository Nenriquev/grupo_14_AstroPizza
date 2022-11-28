const path = require('path');
const fs = require("fs");
const {validationResult} = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;

const Products = db.Product
const Categories = db.Category
const Status = db.Status

function findAllProducts(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/products.json"))
  const data = JSON.parse(jsonData)
  return data
}

function findAllUsers() {
  const dataJson = fs.readFileSync(path.join(__dirname, '../data/users.json'));
  const data = JSON.parse(dataJson);
  return data
}


const writeData = (data) =>{
  const dataString = JSON.stringify(data, null, 4)
  fs.writeFileSync(path.join(__dirname, '../data/products.json'), dataString)
}


const productController = {
  
  list: (req, res) => {
    const products = Products.findAll({include:['category']})
    const userData = findAllUsers();
    const user = userData.find(function(users){
        if(req.session.userLoggedIn){
        return users.id == req.session.userLoggedIn.id
        }
    })

    Promise.all([products, user])
            .then(([products, user]) => {
              res.render('./products/product_list.ejs', {products: products, user: user})
            });
    
  },

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
    
    if(!validationErrors.isEmpty()){
     return res.render('./products/product_create.ejs', {errors: validationErrors.mapped(), old: req.body})
    }

    Products.create({
      name: req.body.product_name,
      description: req.body.description,
      price: req.body.price,
      category_id: req.body.category,
      status_id: 1,
      image: req?.file?.filename ? req.file.filename : 'placeholder.png' 
    }).then(()=>{
      res.redirect("/product");
    })
    },

      //EDITAR//

  edit: (req, res) => {
    const errors = validationResult(req)
    const products = Products.findByPk(req.params.id)
    const status = Status.findAll()
    const category = Categories.findAll()

    Promise.all([products, status, category])
    .then(([products, status, category]) => {
      res.render('./products/product_edit', {product: products, status: status, category: category, validationErrors: errors.mapped()})
    });

  },
     
  update: (req, res) => {
      const errors = validationResult(req);
      const product = Products.findByPk(req.params.id).then((element) => {
        return element;
      });

      if (!errors.isEmpty()) {
        return productController.edit(req, res);
      }

      Products.update(
        {
          name: req.body.product_name,
          description: req.body.description,
          price: req.body.price,
          category_id: req.body.category,
          status_id: req.body.status,
          image: req.file?.filename ? req.file.filename : product.image,
        },
        {
          where: { id: req.params.id },
        }
      ).then(() => {
        res.redirect("/product");
      });
      
    },

    delete: (req, res) => {
      Products.destroy({
        where: {id:req.params.id}
      }).then(() => {
        res.redirect('/product')
      })
      
    },
}

module.exports = productController;