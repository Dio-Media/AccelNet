// accelnet-backend/controllers/news.controller.js
import { pool } from '../config/db.js';

export async function getAllNews(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const [news] = await pool.execute(
            `SELECT news_id, title, content, excerpt, featured_image_url, 
                    category, author_id, created_at, updated_at 
             FROM news 
             ORDER BY created_at DESC 
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        // Get total count
        const [countResult] = await pool.execute('SELECT COUNT(*) as total FROM news');
        const total = countResult[0].total;

        res.status(200).json({
            success: true,
            data: news,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function getNewsById(req, res) {
    try {
        const { id } = req.params;

        const [news] = await pool.execute(
            `SELECT n.*, u.first_name, u.last_name 
             FROM news n
             LEFT JOIN users u ON n.author_id = u.user_id
             WHERE n.news_id = ?`,
            [id]
        );

        if (!news || news.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'News article not found'
            });
        }

        res.status(200).json({
            success: true,
            data: news[0]
        });
    } catch (error) {
        console.error('Error fetching news by ID:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function createNews(req, res) {
    try {
        const { title, content, excerpt, featured_image_url, category } = req.body;
        const author_id = req.user.userId; // From protectRoute middleware

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required'
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO news (title, content, excerpt, featured_image_url, category, author_id, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [title, content, excerpt || null, featured_image_url || null, category || 'General', author_id]
        );

        res.status(201).json({
            success: true,
            message: 'News created successfully',
            data: {
                news_id: result.insertId,
                title,
                content
            }
        });
    } catch (error) {
        console.error('Error creating news:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function updateNews(req, res) {
    try {
        const { id } = req.params;
        const { title, content, excerpt, featured_image_url, category } = req.body;

        const [result] = await pool.execute(
            `UPDATE news 
             SET title = ?, content = ?, excerpt = ?, featured_image_url = ?, 
                 category = ?, updated_at = NOW()
             WHERE news_id = ?`,
            [title, content, excerpt, featured_image_url, category, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'News article not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'News updated successfully'
        });
    } catch (error) {
        console.error('Error updating news:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export async function deleteNews(req, res) {
    try {
        const { id } = req.params;

        const [result] = await pool.execute('DELETE FROM news WHERE news_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'News article not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'News deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting news:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}