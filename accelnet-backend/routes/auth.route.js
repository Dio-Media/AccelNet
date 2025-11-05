// accelnet-backend/routes/auth.route.js - COMPLETE
import express from 'express';
import { login, logout, signup, verifyToken } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protect.route.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", protectRoute, verifyToken);

export default router;