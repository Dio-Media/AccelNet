import express from 'express';
// Import from the correct wg.controller.js file
import { getAllWGs } from '../controllers/wg.controller.js';
import { protectRoute } from '../middleware/protect.route.js';

const router = express.Router();

// Public route to get all working groups
router.get('/', getAllWGs);

export default router;