const fs = require("fs");
const mysql2 = require("mysql2");

const conn = mysql2.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT || 3306,
	ssl: {
		rejectUnauthorized: true,
		ca: serverCa,
	},
});

dbConnection.connect((err) => {
	if (err) {
		console.error("Error connecting to database:", err.stack);
		return;
	}
	console.log("connected as id " + dbConnection.threadId);
});

module.exports = { dbConnection, conn };