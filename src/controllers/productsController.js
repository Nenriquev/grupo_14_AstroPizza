import path from 'path'

const productController = {
  products: (req, res) => {
    res.render(path.resolve('./views/product_detail'))
  },

}


export default productController;