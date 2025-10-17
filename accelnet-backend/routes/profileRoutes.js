const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Profile routes
router.get('/:userId', profileController.getProfile);
router.post('/:userId', profileController.saveProfile);

module.exports = router;