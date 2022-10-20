const express = require('express');
const multer = require('multer')
const path = require('path');

const routerUsers = express.Router();
const usersController = require('../controllers/usersController')

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
routerUsers.get('/login', usersController.login);
routerUsers.post("/login", loginValidation, usersController.loginProcess);
routerUsers.get("/admin", function(req, res){
  if(req.session.usuarioLogueado){
    res.send(req.session.usuarioLogueado.name)
  } else {
    res.send("usuario no se encuentra en sesion")
  }
})

/* Register */
routerUsers.get('/register', usersController.register);
routerUsers.post('/register', uploadFile.single('profile-img'), registerValidation, usersController.newUser);

/* Adimin */

routerUsers.get('/admin', usersController.admin)

module.exports = routerUsers;