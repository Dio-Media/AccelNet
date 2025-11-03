import mysql2 from 'mysql2/promise';
import { ENV_VARS } from './envVars.js';

export const connectDB = async () => {
	try {
		const conn = await mysql2.connect(ENV_VARS.MONGO_URI)
		console.log("MySQL Connected: " + conn.connection.host);
	} catch (error) {
		console.error("Error connecting to MySQL: " + error.message);
        process.exit(1); // 1 means exit with failure, 0 means success
	}
}