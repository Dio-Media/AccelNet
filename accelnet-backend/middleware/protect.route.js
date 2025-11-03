// accelnet-backend/middleware/protectRoute.js
import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        // Check for token in cookies OR Authorization header
        let token = req.cookies?.[ENV_VARS.COOKIE_NAME];
        
        // If no cookie, check Authorization header
        if (!token) {
            const authHeader = req.headers['authorization'];
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token"
            });
        }

        // Get user from database
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Attach user to request object
        req.user = {
            userId: user.user_id,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token"
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Token expired"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};