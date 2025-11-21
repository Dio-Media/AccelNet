// accelnet-backend/routes/grants.route.js
import express from 'express';
import {
  getAllGrants,
  getGrantById,
} from '../controllers/grants.controller.js';
// import { protectRoute } from '../middleware/protect.route.js'; // for future writes

const router = express.Router();

// Public routes
router.get('/', getAllGrants);
router.get('/:id', getGrantById);

export default router;
