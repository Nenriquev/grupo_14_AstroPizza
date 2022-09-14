const path = require('path')

const indexController = {
  index: (req, res) => {
    res.render(path.resolve('./views/index.ejs'))
  },

  faqs: (req, res) => {
    res.render(path.resolve('./views/faqs.ejs'))
  },

  support: (req, res) => {
    res.render(path.resolve('./views/support.ejs'))
  }
}


module.exports = indexController;