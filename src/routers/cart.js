const express = require('express');
const cartController = require("../controllers/cartController.js");

const cartRouter = express.Router()



cartRouter.post('/', cartController.cart)
module.exports = cartRouter;