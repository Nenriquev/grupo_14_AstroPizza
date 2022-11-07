const express = require('express');
const session = require('express-session');
const multer = require('multer')
const path = require('path');
const routerUsers = express.Router();
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middlewares/authMiddleware');
const localsMiddleware = require('../middlewares/localsMiddle');

/*Validations*/
const { registerValidation, loginValidation, profileUpdateValidation } = require('../validations/usersValidation');


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

/* Login */
routerUsers.get('/login', authMiddleware.userLogged ,usersController.login);
routerUsers.post("/login", loginValidation, usersController.loginProcess);
routerUsers.post("/logout", usersController.logout);

/* Register */
routerUsers.get('/register', authMiddleware.userLogged, usersController.register);
routerUsers.post('/register', uploadFile.single('profileImg'), registerValidation, usersController.newUser);

/*PROFILE*/
routerUsers.get('/profile/:id', usersController.profile)
routerUsers.put('/profile/:id', uploadFile.single('profileImg'), profileUpdateValidation, usersController.updateProfile);


module.exports = routerUsers;