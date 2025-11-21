// accelnet-backend/controllers/grants.controller.js
import { pool } from '../config/db.js';

// GET /api/grants
export async function getAllGrants(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;

    const [grants] = await pool.execute(
      `SELECT 
          grant_id,
          title,
          grant_type,
          description,
          funding_amount,
          application_deadline
       FROM angrants
       ORDER BY application_deadline DESC
       LIMIT ${limit} OFFSET ${offset}`
    );

    res.status(200).json({
      success: true,
      data: grants,
      pagination: {
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching grants:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

// GET /api/grants/:id
export async function getGrantById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      `SELECT 
          grant_id,
          title,
          grant_type,
          description,
          funding_amount,
          application_deadline
       FROM angrants
       WHERE grant_id = ?`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Grant not found',
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error('Error fetching grant by id:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
