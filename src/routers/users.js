const express = require('express');
const multer = require('multer')
const path = require('path');
const routerUsers = express.Router();
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middlewares/authMiddleware')

/*Validations*/
const { registerValidation, loginValidation  } = require('../validations/usersValidation');


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
routerUsers.get('/login', authMiddleware.userLogged ,usersController.login);
routerUsers.post("/login", loginValidation, usersController.loginProcess);
routerUsers.post("/logout", usersController.logout);

/* Register */
routerUsers.get('/register', authMiddleware.userLogged, usersController.register);
routerUsers.post('/register', uploadFile.single('profile-img'), registerValidation, usersController.newUser);

module.exports = routerUsers;