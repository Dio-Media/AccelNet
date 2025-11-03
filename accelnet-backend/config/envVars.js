import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    // Database Configuration
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'accelnet',
    
    // Server Configuration
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // JWT Configuration
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key_here_change_in_production',
    JWT_EXPIRES_IN: '7d',
    
    // Frontend Configuration
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    
    // Cookie Configuration
    COOKIE_NAME: 'accelnet_token',
    COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};