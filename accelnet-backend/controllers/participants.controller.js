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
      p.participant_id,
      p.first_name,
      p.last_name,
      p.role,
      p.department,
      p.academic_rank,
      p.orcid,
      p.google_scholar_id,
      p.pfp,
      o.org_name AS institution
    FROM participants p
    LEFT JOIN organizations o ON o.org_id = p.org_id
    ORDER BY RAND()
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
      pfp: row.pfp ? `data:image/jpeg;base64,${row.pfp.toString("base64")}` : null,
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
  const { institution, role, search, page = 1, limit = 20 } = req.query;

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 20));
  const offset = (pageNum - 1) * limitNum;

  // Base query (no semicolon, no ORDER BY yet)
  // NOTE: participants table doesn't have `institution` column — that's org_name via join.
  let sql = `
    SELECT
      p.participant_id,
      p.first_name,
      p.last_name,
      p.role,
      p.department,
      p.academic_rank,
      p.orcid,
      p.google_scholar_id,
      p.pfp,
      o.org_name AS institution
    FROM participants p
    LEFT JOIN organizations o ON o.org_id = p.org_id
    WHERE 1=1
  `;
  const params = [];

  if (institution) {
    sql += ` AND o.org_name = ?`;
    params.push(institution);
  }

  if (role) {
    sql += ` AND p.role = ?`;
    params.push(role);
  }

  if (search) {
    sql += ` AND CONCAT(p.first_name, ' ', p.last_name) LIKE ?`;
    params.push(`%${search}%`);
  }

  sql += ` ORDER BY p.first_name ASC LIMIT ? OFFSET ?`;
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
      pfp: row.pfp ? `data:image/jpeg;base64,${row.pfp.toString("base64")}` : null,
    }));

    let countSql = `
      SELECT COUNT(*) AS total
      FROM participants p
      LEFT JOIN organizations o ON o.org_id = p.org_id
      WHERE 1=1
    `;
    const countParams = [];

    if (institution) {
      countSql += ` AND o.org_name = ?`;
      countParams.push(institution);
    }
    if (role) {
      countSql += ` AND p.role = ?`;
      countParams.push(role);
    }
    if (search) {
      countSql += ` AND CONCAT(p.first_name, ' ', p.last_name) LIKE ?`;
      countParams.push(`%${search}%`);
    }

    const [countResult] = await pool.query(countSql, countParams);
    const total = countResult[0]?.total || 0;

    res.json({
      data,
      pagination: { page: pageNum, limit: limitNum, count: total },
    });
  } catch (err) {
    console.error("Error fetching participants:", err);
    res.status(500).json({ message: "Failed to load participants", error: err.message });
  }
};
