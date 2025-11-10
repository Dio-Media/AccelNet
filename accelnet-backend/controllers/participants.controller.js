// controllers/participants.controller.js
import pool from '../config/db.js';

/**
 * GET /api/participants/homepage
 * Returns a small set of participants for the homepage.
 * You can override limit with ?limit=8 if needed.
 */
export const getHomepageParticipants = async (req, res) => {
  const limit = Number(req.query.limit) || 4;

  try {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        full_name,
        role,
        institution,
        department,
        academic_rank,
        orcid,
        google_scholar_id
      FROM v_participants
      ORDER BY RAND()
      LIMIT ?
      `,
      [limit]
    );

    const data = rows.map((row) => ({
      id: row.id,
      name: row.full_name,
      role: row.role || row.academic_rank || null,
      affiliation: row.institution || null,
      specialty: row.department || null,
      academicRank: row.academic_rank || null,
      orcid: row.orcid || null,
      googleScholarId: row.google_scholar_id || null,
    }));

    res.json({ data });
  } catch (err) {
    console.error('Error fetching homepage participants:', err);
    res.status(500).json({
      message: 'Failed to load homepage participants',
      error: err.message,
    });
  }
};

/**
 * GET /api/participants
 * Full list with optional filters + pagination.
 */
export const getAllParticipants = async (req, res) => {
  const {
    institution,
    role,
    search,
    page = 1,
    limit = 20,
  } = req.query;

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 20));
  const offset = (pageNum - 1) * limitNum;

  let sql = `
    SELECT
      id,
      full_name,
      role,
      institution,
      department,
      academic_rank,
      orcid,
      google_scholar_id
    FROM v_participants
    WHERE 1 = 1
  `;
  const params = [];

  if (institution) {
    sql += ' AND institution = ?';
    params.push(institution);
  }

  if (role) {
    sql += ' AND role = ?';
    params.push(role);
  }

  if (search) {
    sql += ' AND full_name LIKE ?';
    params.push(`%${search}%`);
  }

  sql += ' ORDER BY full_name ASC LIMIT ? OFFSET ?';
  params.push(limitNum, offset);

  try {
    const [rows] = await pool.query(sql, params);

    const data = rows.map((row) => ({
      id: row.id,
      name: row.full_name,
      role: row.role || row.academic_rank || null,
      affiliation: row.institution || null,
      specialty: row.department || null,
      academicRank: row.academic_rank || null,
      orcid: row.orcid || null,
      googleScholarId: row.google_scholar_id || null,
    }));

    res.json({
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        count: data.length,
      },
    });
  } catch (err) {
    console.error('Error fetching participants:', err);
    res.status(500).json({
      message: 'Failed to load participants',
      error: err.message,
    });
  }
};