const {body} = require('express-validator');
const path = require('path')


const supportValidation = {
  createReport: [
    body('names')
        .notEmpty().withMessage('Nombre requerido')
        .isLength({min: 1}).withMessage('El campo debe tener minimo 1 caracter'),

    body('email')
        .notEmpty().withMessage('Email requerido').bail()
        .isEmail().withMessage('Email invalido'),
        
    
    body('telephone')
        .optional(),
    
    body('topic')
        .notEmpty().withMessage('Debe elegir el motivo'),
    
    body('comments')
        .notEmpty().withMessage('Debe incluir informacion adicional'),
    
    body('report_img')
      .notEmpty().withMessage('Debe incluir imagenes y/o facturas').bail()
      .custom((value, {req}) => {
      const extensions = ['.jpg', '.webp', '.png', '.jpeg']
      const fileExtension = path.extname(req.file.originalname)
      return extensions.includes(fileExtension)
    }).withMessage('Imagen con extension invalida')
        
  ]
}

module.exports = supportValidation
