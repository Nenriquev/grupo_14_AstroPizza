const express = require('express')
const multer = require('multer')
const path = require('path')
const productsController = require("../controllers/productsController.js");
const productValidation = require('../validations/productValidation.js');
const authMiddleware = require('../middlewares/authMiddleware');
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

const uploadFile = multer({
  storage: multerDiskStorage,
  fileFilter: (req, file, callback) => {
    const extensions = ['.jpg', '.png', '.webp', '.jpeg', '.gif'];
    const fileExtension = path.extname(file.originalname);
    const imgValidation = extensions.includes(fileExtension);
    
    if(!imgValidation){
      req.file = file
    }
    callback(null, imgValidation)
    
  }})
    
/*Products*/
productRouter.get('/', productsController.list)

/*Products Detail*/
productRouter.get('/detail/:value', productsController.product)
productRouter.post('/detail/:value', productsController.product)

/*Create*/
productRouter.get('/create', authMiddleware.isAdmin, productsController.create)
productRouter.post('/create', uploadFile.single('image'), productValidation.createProduct, productsController.store)

/*Update*/
productRouter.get('/edit/:id',authMiddleware.isAdmin, productsController.edit)
productRouter.put('/edit/:id', uploadFile.single('image'), productValidation.updateProduct, productsController.update)
productRouter.delete('/edit/:id', productsController.delete)

module.exports = productRouter;