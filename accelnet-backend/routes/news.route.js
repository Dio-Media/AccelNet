// accelnet-backend/routes/news.route.js
import express from 'express';
import { 
    getAllNews, 
    getNewsById, 
    createNews, 
    updateNews, 
    deleteNews 
} from '../controllers/news.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Public routes
router.get('/', getAllNews);
router.get('/:id', getNewsById);

// Protected routes (require authentication)
router.post('/', protectRoute, createNews);
router.put('/:id', protectRoute, updateNews);
router.delete('/:id', protectRoute, deleteNews);

export default router;