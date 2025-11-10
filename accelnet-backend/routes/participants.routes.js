// routes/participants.route.js
import express from 'express';
import {
  getHomepageParticipants,
  getAllParticipants,
} from '../controllers/participants.controller.js';

const router = express.Router();

// GET /api/participants
router.get('/', getAllParticipants);

// GET /api/participants/homepage
router.get('/homepage', getHomepageParticipants);

export default router;
