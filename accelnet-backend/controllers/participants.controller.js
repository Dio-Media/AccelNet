import { pool } from '../config/db.js';

/**
 * GET /api/participants
 * List participants with optional filters
 */
export const getAllParticipants = async (req, res) => {
  const { institution, search } = req.query;

  let sql = `
    SELECT 
      p.participants_id,
      p.first_name,
      p.last_name,
      p.email,
      p.title,
      p.academic_rank,
      p.department,
      p.orcid,
      p.google_scholar,
      p.linkedin,
      p.profile_picture,
      i.name AS institution
    FROM participants p
    LEFT JOIN institutions i ON i.id = p.institution_id
    WHERE p.is_active = TRUE
  `;

  const params = [];

  if (institution) {
    sql += ` AND i.name = ?`;
    params.push(institution);
  }

  if (search) {
    sql += ` AND CONCAT(p.first_name, ' ', p.last_name) LIKE ?`;
    params.push(`%${search}%`);
  }

  sql += ` ORDER BY p.first_name ASC`;

  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching participants:', err);
    res.status(500).json({ message: 'Failed to load participants' });
  }
};


/**
 * GET /api/participants/:id
 */
export const getParticipantById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        p.*,
        i.name AS institution
      FROM participants p
      LEFT JOIN institutions i ON i.id = p.institution_id
      WHERE p.participants_id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching participant:', err);
    res.status(500).json({ message: 'Failed to load participant' });
  }
};
