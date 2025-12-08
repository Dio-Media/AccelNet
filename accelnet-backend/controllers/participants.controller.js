import { pool } from '../config/db.js';

/**
 * GET /api/participants/homepage
 * Returns a small set of participants for the homepage.
 */
export const getHomepageParticipants = async (req, res) => {
  const limit = Number(req.query.limit) || 4;

  try {
    const [rows] = await pool.query(
      `
      SELECT
        participant_id,
        first_name,
        last_name,
        role,
        institution,
        department,
        academic_rank,
        orcid,
        google_scholar_id,
        pfp
      FROM participants
      ORDER BY participant_id
      LIMIT ?
      `,
      [limit]
    );

    const data = rows.map((row) => ({
      id: row.participant_id,
      name: `${row.first_name} ${row.last_name}`,
      role: row.role || row.academic_rank || null,
      affiliation: row.institution || null,
      specialty: row.department || null,
      academicRank: row.academic_rank || null,
      orcid: row.orcid || null,
      googleScholarId: row.google_scholar_id || null,
      pfp: row.pfp ? 'data:image/jpeg;base64,' + row.pfp.toString('base64') : null
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
      participant_id, 
      first_name,
      last_name,
      role,
      institution,
      department,
      academic_rank,
      orcid,
      google_scholar_id,
      pfp
    FROM participants
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
    sql += ' AND CONCAT(first_name, " ", last_name) LIKE ?';
    params.push(`%${search}%`);
  }

  sql += ' ORDER BY last_name ASC LIMIT ? OFFSET ?';
  params.push(limitNum, offset);

  try {
    const [rows] = await pool.query(sql, params);

    const data = rows.map((row) => ({
      id: row.participant_id, 
      name: `${row.first_name} ${row.last_name}`,
      role: row.role || row.academic_rank || null,
      affiliation: row.institution || null,
      specialty: row.department || null,
      academicRank: row.academic_rank || null,
      orcid: row.orcid || null,
      googleScholarId: row.google_scholar_id || null,
      pfp: row.pfp ? 'data:image/jpeg;base64,' + row.pfp.toString('base64') : null
    }));

    // Get total count for pagination
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM participants');
    const total = countResult[0]?.total || 0;

    res.json({
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        count: total,
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