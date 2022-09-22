const express = require('express')
const indexController = require("../controllers/indexController.js");

const indexRouter = express.Router()

indexRouter.get('/', indexController.index)
indexRouter.get('/faqs', indexController.faqs)
indexRouter.get('/soporte', indexController.support)
indexRouter.get('/sobre-nosotros', indexController.about)
indexRouter.get('/login', indexController.login)



module.exports = indexRouter;

