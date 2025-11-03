import mysql from 'mysql2/promise';
import { ENV_VARS } from './envVars.js';

// Create connection pool
export const pool = mysql.createPool({
    host: ENV_VARS.DB_HOST,
    user: ENV_VARS.DB_USER,
    password: ENV_VARS.DB_PASSWORD,
    database: ENV_VARS.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

// Test database connection
export const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`MySQL Connected: ${connection.connection.config.host}`);
        console.log(`Database: ${ENV_VARS.DB_NAME}`);
        connection.release();
        return true;
    } catch (error) {
        console.error("Error connecting to MySQL:", error.message);
        console.error("  Check your .env file credentials:");
        console.error(`  - DB_HOST: ${ENV_VARS.DB_HOST}`);
        console.error(`  - DB_USER: ${ENV_VARS.DB_USER}`);
        console.error(`  - DB_NAME: ${ENV_VARS.DB_NAME}`);
        process.exit(1);
    }
};

// Helper function to execute queries with error handling
export const query = async (sql, params = []) => {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error.message);
        throw error;
    }
};

export default pool;