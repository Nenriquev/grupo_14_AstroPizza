const express = require('express')
const multer = require('multer')
const indexController = require("../controllers/indexController.js");
const supportValidation = require('../validations/supportValidation.js');


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

const uploadFile = multer({
  storage: multerDiskStorage,
  fileFilter: (req, file, callback) => {
    const extensions = ['.jpg', '.png', '.webp', '.jpeg'];
    const fileExtension = path.extname(file.originalname);
    const imgValidation = extensions.includes(fileExtension);
    if(!imgValidation){
      req.file = file
    }
    callback(null, imgValidation)
  }})

indexRouter.get('/', indexController.index)
indexRouter.get('/faqs', indexController.faqs)
indexRouter.get('/soporte', indexController.support)
indexRouter.post('/soporte', uploadFile.single('report_imag'),supportValidation.createReport, indexController.reportSubmit)
indexRouter.get('/sobre-nosotros', indexController.about)


module.exports = indexRouter;

