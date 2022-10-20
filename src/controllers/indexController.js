const path = require('path')
const fs = require('fs')
const {validationResult} = require('express-validator');

function findAllProducts(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/products.json"))
  const data = JSON.parse(jsonData)
  return data
}

const readReports = () =>{
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/reports.json"))
  const data = JSON.parse(jsonData)
  return data
}

const writeData = (data) =>{
  const dataString = JSON.stringify(data, null, 4)
  fs.writeFileSync(path.join(__dirname, '../data/reports.json'), dataString)
}

const indexController = {
  index: (req, res) => {
    const data = findAllProducts();

    const dataPizza = data.filter(element => element.category === "Pizzas");
    res.render('index.ejs', {dataPizza: dataPizza})
  },

  faqs: (req, res) => {

    res.render('faqs.ejs')
  },

  support: (req, res) => {
    res.render('support.ejs')
  },

  reportSubmit: (req, res) => {
    const validationErrors = validationResult(req)
    const data = readReports()

    console.log(validationErrors)
    
    if(!validationErrors.isEmpty()){
      return res.render('support.ejs', {errors: validationErrors.mapped(), old: req.body})
     }

    const newReport = {
        id: String(data.length + 1),
        name: req.body.names,
        email: req.body.email,
        tel: req.body.telephone,
        topic: req.body.topic,        
        comentarios: req.body.comments,
        status: 'En revision',
        image: "",
      }

      data.push(newReport)
      writeData(data)
      res.redirect("/");
  },

  about: (req, res) => {
    res.render('about.ejs')
  },

}


module.exports = indexController;