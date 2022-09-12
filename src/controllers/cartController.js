import path from 'path'

const cartController = {
  cart: (req, res) => {
    res.render(path.resolve('./views/cart.ejs'))
  },

}


export default cartController;