const path = require('path')
const fs = require("fs");

function findAllProducts(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/products.json"))
  const data = JSON.parse(jsonData)
  return data
}

const indexController = {
  index: (req, res) => {
    const data = findAllProducts();

    dataPizza = data.filter(x => x.category == "pizza");

    res.render('index.ejs', {dataPizza: dataPizza})
  },

  faqs: (req, res) => {

    res.render('faqs.ejs')
  },

  support: (req, res) => {
    res.render('support.ejs')
  },

  about: (req, res) => {
    res.render('about.ejs')
  },

}


module.exports = indexController;