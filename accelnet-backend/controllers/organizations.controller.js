// accelnet-backend/controllers/organizations.controller.js
import { pool } from '../config/db.js';

// GET /api/organizations
export async function getAllOrganizations(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;

    const [organizations] = await pool.execute(
      `SELECT 
          org_id,
          org_name,
          org_type,
          country,
          website_url,
          logo_url,
          org_description
       FROM organizations
       ORDER BY org_name ASC
       LIMIT ${limit} OFFSET ${offset}`
    );

    res.status(200).json({
      success: true,
      data: organizations,
      pagination: {
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching organizations:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

// GET /api/organizations/:id
export async function getOrganizationById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      `SELECT 
          org_id,
          org_name,
          org_type,
          country,
          website_url,
          logo_url,
          org_description
       FROM organizations
       WHERE org_id = ?`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error('Error fetching organization by id:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
