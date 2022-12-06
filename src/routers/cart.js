const express = require('express');
const cartController = require("../controllers/cartController.js");
const cartMiddleware = require('../middlewares/cartMiddleware')
const cartRouter = express.Router()



cartRouter.get('/', cartMiddleware.userLogged ,cartController.cart)
cartRouter.delete('/:index', cartController.removeItem)
module.exports = cartRouter;