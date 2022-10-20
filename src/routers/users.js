const express = require('express');
const multer = require('multer')
const path = require('path');

const routerUsers = express.Router();
const usersController = require('../controllers/usersController')

/*Validations*/
const { registerValidation } = require('../validations/registerValidation');

/*Multer*/
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) =>{
      const folder = path.join(__dirname, '../../public/img/profile');
      callback(null, folder)
    }, 
    filename: (req, file, callback) => {
      const imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      callback(null, imageName)
    }
});

const uploadFile = multer({ storage : multerDiskStorage });

/* Login */
routerUsers.get('/login', usersController.login);

/* Register */
routerUsers.get('/register', usersController.register);
routerUsers.post('/register', uploadFile.single('profile-img'), registerValidation, usersController.newUser);

module.exports = routerUsers;