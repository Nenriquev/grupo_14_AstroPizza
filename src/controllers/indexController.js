import path from 'path'

const indexController = {
  index: (req, res) => {
    res.sendFile(path.resolve('./views/index.html'))
  },

  faqs: (req, res) => {
    res.sendFile(path.resolve('./views/faqs.html'))
  },
  productDetail:  (req, res) => {
    res.sendFile(path.resolve('./views/product_detail.html'))
  },
}


export default indexController;