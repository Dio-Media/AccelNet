// accelnet-backend/routes/events.route.js - FIXED
import express from 'express';
import { 
    getAllEvents, 
    getUpcomingEvents, 
    getEventById,
    registerForEvent,
    unregisterFromEvent,
    getUserEvents
} from '../controllers/events.controller.js';
import { protectRoute } from '../middleware/protect.route.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/:id', getEventById);

// Protected routes (require authentication)
router.post('/:id/register', protectRoute, registerForEvent);
router.delete('/:id/register', protectRoute, unregisterFromEvent);
router.get('/user/my-events', protectRoute, getUserEvents);

export default router;