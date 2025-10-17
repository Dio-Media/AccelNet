const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify', authenticate, authController.verify);

module.exports = router;