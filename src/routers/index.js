const express = require('express')
const indexController = require("../controllers/indexController.js");
const productController = require('../controllers/productsController.js');

const indexRouter = express.Router()

indexRouter.get('/', indexController.index)
indexRouter.get('/faqs', indexController.faqs)
indexRouter.get('/soporte', indexController.support)
indexRouter.get('/sobre-nosotros', indexController.about)

/* Ir a Product Detail */
indexRouter.post('/product', productController.product)

module.exports = indexRouter;

