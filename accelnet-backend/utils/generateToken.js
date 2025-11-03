import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign(
        { userId }, 
        ENV_VARS.JWT_SECRET, 
        { expiresIn: ENV_VARS.JWT_EXPIRES_IN }
    );

    res.cookie(ENV_VARS.COOKIE_NAME, token, {
        maxAge: ENV_VARS.COOKIE_MAX_AGE,
        httpOnly: true, // Prevents XSS attacks
        sameSite: "strict", // Prevents CSRF attacks
        secure: ENV_VARS.NODE_ENV === "production", // HTTPS only in production
    });

    return token;
};

export const generateToken = (userId) => {
    return jwt.sign(
        { userId }, 
        ENV_VARS.JWT_SECRET, 
        { expiresIn: ENV_VARS.JWT_EXPIRES_IN }
    );
};