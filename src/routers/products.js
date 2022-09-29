const express = require('express')
const productsController = require("../controllers/productsController.js");

const productRouter = express.Router()

productRouter.get('/', productsController.products)

/*Create*/
productRouter.get('/create', productsController.create)
productRouter.post('/create', productsController.store)

/*Update*/
productRouter.get('/edit/:id', productsController.edit)

module.exports = productRouter;