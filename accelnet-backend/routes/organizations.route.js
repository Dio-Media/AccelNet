// accelnet-backend/routes/organizations.route.js
import express from 'express';
import {
  getAllOrganizations,
  getOrganizationById,
} from '../controllers/organizations.controller.js';
// import { protectRoute } from '../middleware/protect.route.js'; // for future POST/PUT/DELETE

const router = express.Router();

// Public routes
router.get('/', getAllOrganizations);
router.get('/:id', getOrganizationById);

export default router;
