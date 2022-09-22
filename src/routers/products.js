const express = require('express')
const productsController = require("../controllers/productsController.js");

const productRouter = express.Router()

productRouter.get('/', productsController.products)
productRouter.get('/create', productsController.create)

module.exports = productRouter;