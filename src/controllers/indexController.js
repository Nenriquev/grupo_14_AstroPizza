const path = require('path')

const indexController = {
  index: (req, res) => {
    res.render('index.ejs')
  },

  faqs: (req, res) => {

    res.render('faqs.ejs')
  },

  support: (req, res) => {
    res.render('support.ejs')
  }
}


module.exports = indexController;