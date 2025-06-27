const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const authMiddleware = require('../middleware/auth');

//Public routes
router.post('/signup', usersController.signup );
router.post('/login', usersController.login);

//Protected routes
router.get('/profile', authMiddleware, usersController.getProfile);
router.put('/update_profile', authMiddleware, usersController.updateProfile);

module.exports = router;