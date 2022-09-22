const express = require('express');
const routerUsers = express.Router();

const usersController = require('../controllers/usersController')

/* Login */
routerUsers.get('/login', usersController.login);

/* Register */
routerUsers.get('/register', usersController.register)

module.exports = routerUsers;