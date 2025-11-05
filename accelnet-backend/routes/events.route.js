import express from 'express';
import { 
    getAllEvents, 
    getUpcomingEvents, 
    getEventById,
    registerForEvent,
    unregisterFromEvent,
    getUserEvents,
} from '../controllers/events.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getUpcomingEvents);

// Protected routes (require authentication)
router.post('/', protectRoute, getEventById);
router.put('/:id', protectRoute, registerForEvent);
router.delete('/:id', protectRoute, unregisterFromEvent);
router.get('/user/events', protectRoute, getUserEvents);

export default router;