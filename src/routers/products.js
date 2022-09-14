const express = require('express')
const productsController = require("../controllers/productsController.js");

const productRouter = express.Router()

productRouter.get('/', productsController.products)

module.exports = productRouter;