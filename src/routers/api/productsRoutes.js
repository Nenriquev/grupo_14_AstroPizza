const express = require('express');
const router = express.Router();

const apiProductsController = require('../../controllers/api/productsController');

router.get('/', apiProductsController.redirect);
router.get('/list', apiProductsController.totalList);
router.get('/sales', apiProductsController.sales);
router.get('/page/:id', apiProductsController.list);
router.get('/:id', apiProductsController.detail);
module.exports = router;