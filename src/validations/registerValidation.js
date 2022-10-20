const {body} = require('express-validator');
const path = require('path');

module.exports = {
    registerValidation: [

        body('first_name')
            .notEmpty().withMessage('El campo nombre esta incompleto'),

        body('last_name')
            .notEmpty().withMessage('El campo apellido esta incompleto'),

        body('telefono')
            .notEmpty().withMessage('El campo telefono esta incompleto').bail()
            .isNumeric().withMessage('Valores invalidos'),

        body('email')
            .notEmpty().withMessage('El campo email esta incompleto').bail()
            .isEmail().withMessage('El email es invalido'),

        body('password')
            .notEmpty().withMessage('El campo contrasenia esta incompleto').bail()
            .isNumeric().withMessage('Valores invalidos').bail()
            .isLength({min: 6, max:20}).withMessage('La contraseña debe tener minimo 6 caracteres'),

        body('password-repeat')
            .notEmpty().withMessage('El campo repetir contrasenia esta incompleto').bail()
            .isNumeric().withMessage('Valores invalidos').bail()
            .isLength({min: 6, max:20}).withMessage('La contraseña debe tener minimo 6 caracteres'),

        body('profile-img')
            .custom((value, {req}) => {
                const extensions = ['.jpg', '.webp', '.png', '.jpeg']
                const fileExtension = path.extname(req.file.originalname)
                return extensions.includes(fileExtension)
            }).withMessage('Imagen con extencion invalida')

    ]
}