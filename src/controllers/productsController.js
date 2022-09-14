const path = require('path')

const productController = {
  products: (req, res) => {
    res.render(path.resolve('./views/product_detail.ejs'))
  },

}

module.exports = productController;