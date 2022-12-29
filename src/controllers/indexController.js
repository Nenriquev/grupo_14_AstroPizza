const path = require('path')
const {validationResult} = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;
const Products = db.Product


const indexController = {
  index: (req, res) => {
    Products.findAll(
      {
        where: { category_id: 1 }
      }).then((pizzas) => 
    res.render('index.ejs', {pizza: pizzas})
    )
  },

  faqs: (req, res) => {

    res.render('faqs.ejs')
  },

  support: (req, res) => {
    res.render('support.ejs')
  },

  reportSubmit: (req, res) => {
    const validationErrors = validationResult(req)
  
    if(!validationErrors.isEmpty()){
      return res.render('support.ejs', {errors: validationErrors.mapped(), old: req.body})
     }

    
      res.redirect("/");
  },

  about: (req, res) => {
    res.render('about.ejs')
  },

}


module.exports = indexController;