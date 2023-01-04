const express = require('express');
const router = express.Router();

const apiUsersController = require('../../controllers/api/usersController');

router.get('/', apiUsersController.redirect);
router.get('/list', apiUsersController.allUsers);
router.get('/page/:id', apiUsersController.list);
router.get('/:id', apiUsersController.detail);

module.exports = router;