// accelnet-backend/routes/publications.route.js - FIXED
import express from 'express';
import { 
    getAllPublications,  
    getPublicationsById,
    getPublicationsByTitle,
    
} from '../controllers/publications.controller.js';
import { protectRoute } from '../middleware/protect.route.js';

const router = express.Router();

// Public routes
router.get('/', getAllPublications);
router.get('/:id', getPublicationsById);
router.get('/title/:title', getPublicationsByTitle);


export default router;