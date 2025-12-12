// accelnet-backend/controllers/organizations.controller.js
import { pool } from '../config/db.js';

// GET /api/organizations
export async function getAllOrganizations(req, res) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').toString().trim();
    const orgType = (req.query.org_type || '').toString().trim();

    // Build WHERE safely
    let where = 'WHERE 1=1';
    const params = [];

    if (search) {
      where += ' AND o.org_name LIKE ?';
      params.push(`%${search}%`);
    }

    if (orgType) {
      where += ' AND o.org_type = ?';
      params.push(orgType);
    }

    // Return orgs + a participant count so the UI can show meaningful numbers.
    const sql = `
      SELECT
        o.org_id,
        o.org_name,
        o.org_type,
        COUNT(p.participant_id) AS participant_count
      FROM organizations o
      LEFT JOIN participants p ON p.org_id = o.org_id
      ${where}
      GROUP BY o.org_id, o.org_name, o.org_type
      ORDER BY participant_count DESC, o.org_name ASC
      LIMIT ? OFFSET ?
    `;

    const [organizations] = await pool.query(sql, [...params, limit, offset]);

    // Count for pagination (count organizations, not participants)
    const countSql = `SELECT COUNT(*) AS total FROM organizations o ${where}`;
    const [countRows] = await pool.query(countSql, params);
    const total = countRows?.[0]?.total ?? 0;

    res.status(200).json({
      success: true,
      data: organizations,
      pagination: { page, limit, total },
    });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
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
          org_type
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

// GET /api/organizations/:id/participants
export async function getParticipantsByOrganization(req, res) {
  try {
    const { id } = req.params;
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
    const page = Math.max(1, Number(req.query.page) || 1);
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      `
      SELECT
        p.participant_id,
        p.first_name,
        p.last_name,
        p.role,
        p.department,
        p.academic_rank,
        p.orcid,
        p.google_scholar_id,
        p.pfp
      FROM participants p
      WHERE p.org_id = ?
      ORDER BY p.last_name ASC, p.first_name ASC
      LIMIT ? OFFSET ?
      `,
      [id, limit, offset]
    );

    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM participants WHERE org_id = ?`,
      [id]
    );
    const total = countRows?.[0]?.total ?? 0;

    const data = rows.map((row) => ({
      id: row.participant_id,
      name: `${row.first_name} ${row.last_name}`,
      role: row.role || row.academic_rank || null,
      specialty: row.department || null,
      academicRank: row.academic_rank || null,
      orcid: row.orcid || null,
      googleScholarId: row.google_scholar_id || null,
      pfp: row.pfp ? `data:image/jpeg;base64,${row.pfp.toString('base64')}` : null,
    }));

    res.status(200).json({
      success: true,
      data,
      pagination: { page, limit, total },
    });
  } catch (error) {
    console.error('Error fetching org participants:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}