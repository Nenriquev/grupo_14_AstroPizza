const path = require('path');
const {validationResult} = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;

const Products = db.Product
const Categories = db.Category
const Status = db.Status



const productController = {
  
  list: (req, res) => {
    const products = Products.findAll({include:['category']})
    const user = req.session.userLoggedIn

    Promise.all([products, user])
            .then(([products, user]) => {
              res.render('./products/product_list.ejs', {products: products, user: user, req: req.query})
            });
    
  },

  product: async (req, res) => {

    const pizza = await Products.findAll({where: {name: req.params.value}})
    const data = await Products.findAll({include:['category']})

       if(pizza[0].category_id != 1){
        return res.redirect('/product')
       }

        const pizzaData = req.params.value;
        req.session.pizza = req.params.value;
   
      
      res.render("./products/product_detail.ejs", {pizzaData: pizzaData, products: data})
      
  },

  create: (req, res) => {
    res.render('./products/product_create.ejs', {req: req.query})
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

      res.redirect("/product/create?product=success");
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
        res.redirect("/product?product=update");
      });
      
    },

    delete: (req, res) => {
      Products.destroy({
        where: {id:req.params.id}
      }).then(() => {
        res.redirect('/product?product=delete')
      })
      
    }
}

module.exports = productController;