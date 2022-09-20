const path = require('path')

const cartController = {
  cart: (req, res) => {
    res.render('cart.ejs')
  },

}

module.exports = cartController;