import path from 'path'

const productController = {
  products: (req, res) => {
    res.sendFile(path.resolve('./views/product_detail.ejs'))
  },

}


export default productController;