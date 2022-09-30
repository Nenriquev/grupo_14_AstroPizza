const express = require('express')
const multer = require('multer')
const indexController = require("../controllers/indexController.js");
const productController = require('../controllers/productsController.js');

const indexRouter = express.Router()

/*Multer*/
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) =>{
    const folder = path.join(__dirname, '../../public/img/reports');
    callback(null, folder)
  }, 
  filename: (req, file, callback) => {
    const imageName = req.body.product_name + path.extname(file.originalname);
    callback(null, imageName.replace(/ /g, '-'))
  }
})

const uploadFile = multer({storage: multerDiskStorage})

indexRouter.get('/', indexController.index)
indexRouter.get('/faqs', indexController.faqs)
indexRouter.get('/soporte', indexController.support)
indexRouter.post('/soporte', indexController.reportSubmit)
indexRouter.get('/sobre-nosotros', indexController.about)

/* Ir a Product Detail */
indexRouter.post('/product', productController.product)

module.exports = indexRouter;

