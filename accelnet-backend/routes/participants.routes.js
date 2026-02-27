// routes/participants.routes.js
import express from 'express';
import {
  getAllParticipants,
  getParticipantById
} from '../controllers/participants.controller.js';

const router = express.Router();

// =====================
// PUBLIC ROUTES
// =====================

router.get('/', getAllParticipants);
router.get('/:id', getParticipantById);

// =====================
// ADMIN ROUTES (DISABLED FOR NOW)
// =====================

export default router;