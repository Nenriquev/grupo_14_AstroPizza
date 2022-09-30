const express = require('express')
const multer = require('multer')
const path = require('path')
const productsController = require("../controllers/productsController.js");
const productRouter = express.Router()

/*Multer*/
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) =>{
    const folder = path.join(__dirname, '../../public/img/pizzas');
    callback(null, folder)
  }, 
  filename: (req, file, callback) => {
    const imageName = req.body.product_name + path.extname(file.originalname);
    callback(null, imageName.replace(/ /g, '-'))
  }
})

const uploadFile = multer({storage: multerDiskStorage})

/*Products*/
productRouter.get('/:value', productsController.product)

/*Create*/
productRouter.get('/create', productsController.create)
productRouter.post('/create', uploadFile.single('image'), productsController.store)

/*Update*/
productRouter.get('/edit/:id', productsController.edit)
productRouter.put('/edit/:id', productsController.update)
productRouter.delete('/edit/:id', productsController.delete)

module.exports = productRouter;