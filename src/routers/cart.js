const express = require('express')
const cartController = require("../controllers/cartController.js");

const cartRouter = express.Router()

cartRouter.get('/', cartController.cart)

module.exports = cartRouter;