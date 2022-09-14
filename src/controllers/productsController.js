const path = require('path')

const productController = {
  products: (req, res) => {
    res.render('product_detail.ejs')
  },

}

module.exports = productController;