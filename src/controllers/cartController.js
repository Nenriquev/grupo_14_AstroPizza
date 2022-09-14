const path = require('path')

const cartController = {
  cart: (req, res) => {
    res.render(path.resolve('./views/cart.ejs'))
  },

}

module.exports = cartController;