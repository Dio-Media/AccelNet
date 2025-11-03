import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

class User {
    // Create a new user
    static async create({ email, password, first_name, last_name }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const [result] = await pool.execute(
                `INSERT INTO users (email, password_hash, first_name, last_name, created_at, updated_at) 
                 VALUES (?, ?, ?, ?, NOW(), NOW())`,
                [email, hashedPassword, first_name, last_name]
            );

            return {
                user_id: result.insertId,
                email,
                first_name,
                last_name
            };
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            const [users] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return users[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Find user by ID
    static async findById(userId) {
        try {
            const [users] = await pool.execute(
                'SELECT user_id, email, first_name, last_name, role, created_at, updated_at FROM users WHERE user_id = ?',
                [userId]
            );
            return users[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Update user profile
    static async update(userId, { first_name, last_name, bio, institution, orcid }) {
        try {
            const [result] = await pool.execute(
                `UPDATE users 
                 SET first_name = ?, last_name = ?, bio = ?, institution = ?, orcid = ?, updated_at = NOW()
                 WHERE user_id = ?`,
                [first_name, last_name, bio, institution, orcid, userId]
            );
            
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Compare password
    static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Get user's registered events
    static async getUserEvents(userId) {
        try {
            const [events] = await pool.execute(
                `SELECT e.*, er.registration_date, er.attendance_status
                 FROM anevents e
                 INNER JOIN event_registration er ON e.event_id = er.event_id
                 WHERE er.user_id = ?
                 ORDER BY e.start_datetime DESC`,
                [userId]
            );
            return events;
        } catch (error) {
            throw error;
        }
    }

    // Get all users (admin only)
    static async getAll() {
        try {
            const [users] = await pool.execute(
                'SELECT user_id, email, first_name, last_name, role, created_at FROM users ORDER BY created_at DESC'
            );
            return users;
        } catch (error) {
            throw error;
        }
    }

    // Delete user
    static async delete(userId) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM users WHERE user_id = ?',
                [userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default User;