// accelnet-backend/controllers/events.controller.js
import { pool } from '../config/db.js';

export async function getAllEvents(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const [events] = await pool.execute(
            `SELECT event_id, title, event_description, start_datetime, end_datetime,
                    location, venue, event_type, status, created_at
             FROM anevents
             ORDER BY start_datetime DESC
             LIMIT ${limit} OFFSET ${offset}` // Use template literals
            // Remove the [limit, offset] array argument
        );

        const [countResult] = await pool.execute('SELECT COUNT(*) as total FROM anevents');
        const total = countResult[0].total;

        res.status(200).json({
            success: true,
            data: events,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function getUpcomingEvents(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 6;

        const [events] = await pool.execute(
            `SELECT event_id, title, event_description, start_datetime, end_datetime,
            location, venue, event_type, status
            FROM anevents
            WHERE start_datetime > NOW() AND status = 'upcoming'  /* <-- LOGIC FIX */
            ORDER BY start_datetime ASC
            LIMIT ${limit}`
        );

        res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error('Error fetching upcoming events:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function getEventById(req, res) {
    try {
        const { id } = req.params;

        const [events] = await pool.execute(
            `SELECT * FROM anevents WHERE event_id = ?`,
            [id]
        );

        if (!events || events.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            data: events[0]
        });
    } catch (error) {
        console.error('Error fetching event:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function registerForEvent(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Check if already registered
        const [existing] = await pool.execute(
            'SELECT * FROM event_registration WHERE event_id = ? AND user_id = ?',
            [id, userId]
        );

        if (existing && existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Already registered for this event'
            });
        }

        // Register for event
        await pool.execute(
            `INSERT INTO event_registration (event_id, user_id, registration_date, attendance_status)
             VALUES (?, ?, NOW(), 'registered')`,
            [id, userId]
        );

        res.status(201).json({
            success: true,
            message: 'Successfully registered for event'
        });
    } catch (error) {
        console.error('Error registering for event:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function unregisterFromEvent(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const [result] = await pool.execute(
            'DELETE FROM event_registration WHERE event_id = ? AND user_id = ?',
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully unregistered from event'
        });
    } catch (error) {
        console.error('Error unregistering from event:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function getUserEvents(req, res) {
    try {
        const userId = req.user.userId;

        const [events] = await pool.execute(
            `SELECT e.*, er.registration_date, er.attendance_status
             FROM anevents e
             INNER JOIN event_registration er ON e.event_id = er.event_id
             WHERE er.user_id = ?
             ORDER BY e.start_datetime DESC`,
            [userId]
        );

        res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error('Error fetching user events:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}