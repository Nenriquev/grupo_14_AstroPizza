const {body} = require('express-validator');
const path = require('path');
const fs = require('fs');

function findAllUsers() {
    const dataJson = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    const data = JSON.parse(dataJson);
    return data
}

module.exports = {
    registerValidation: [

        body('names')
            .notEmpty().withMessage('El campo nombre esta incompleto')
            .isLength({min: 6}).withMessage('El nombre debe tener minimo 6 caracteres'),

        body('email')
            .notEmpty().withMessage('El campo email esta incompleto').bail()
            .isEmail().withMessage('El email es invalido').bail()
            .custom((value, {req}) => {
                const users = findAllUsers()
                const matchEmail = users.find(user => user.email == req.body.email)
                return !matchEmail
            }).withMessage('El email esta en uso'),
        
        body('telefono')
            .optional(),


        body('password')
            .notEmpty().withMessage('El campo contrasena esta incompleto').bail()
            .isLength({min: 6, max:20}).withMessage('La contrasena debe tener minimo 6 caracteres'),

        body('passwordRepeat')
            .notEmpty().withMessage('El campo repetir contrasena esta incompleto').bail()
            .custom((passwordRepeat , {req}) =>{
                const password = req.body.password
                return password === passwordRepeat
            }).withMessage('Las contrasenas no coinciden'),

        body('profileImg')
            .if((value, {req}) => req.file).bail()
            .custom((value, {req}) => {
                const extensions = ['.jpg', '.webp', '.png', '.jpeg']
                const fileExtension = path.extname(req.file.originalname)
                return extensions.includes(fileExtension)
            }).withMessage('Imagen con extencion invalida'),
        
        body('tyc')
            .notEmpty().withMessage('Debe aceptar los terminos y condiciones')
            

    ],
    loginValidation: [
        
        body("email")
        .notEmpty()
        .withMessage("Campo email incompleto"),
        body("password")
        .notEmpty()
        .withMessage("campo contraseña incompleto")
    ]
}