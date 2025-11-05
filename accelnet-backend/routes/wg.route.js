// accelnet-backend/routes/wg.route.js
import express from 'express';
// Import from the correct wg.controller.js file
import { 
    getAllWGs
    // getWGById, (add this when you create it)
} from '../controllers/wg.controller.js';
import { protectRoute } from '../middleware/protect.route.js';

const router = express.Router();

// Public route to get all working groups
router.get('/', getAllWGs);

// You can add protected routes later
// router.post('/', protectRoute, createWG);

export default router;