const path = require('path')
const fs = require('fs')

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
    res.render('index.ejs')
  },

  faqs: (req, res) => {

    res.render('faqs.ejs')
  },

  support: (req, res) => {
    res.render('support.ejs')
  },

  reportSubmit: (req, res) => {
    const data = readReports()
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