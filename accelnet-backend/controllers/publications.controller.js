// controllers/publications.controller.js
import pool from "../config/db.js"; // or: import { pool } from "../config/db.js"; if your db.js uses named export

// Helper to safely get integers with defaults
function toInt(value, defaultValue) {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? defaultValue : n;
}

/**
 * GET /api/publications
 * Optional query params: page, pageSize
 */
export const getAllPublications = async (req, res) => {
  const page = toInt(req.query.page || "1", 1);
  const pageSize = toInt(req.query.pageSize || "20", 20);
  const offset = (page - 1) * pageSize;

  try {
    // No placeholders in LIMIT/OFFSET → no param mismatch
    const sql = `
      SELECT
        publication_id,
        title,
        publication_type,
        journal_name,
        publication_date,
        doi,
        pmid,
        pmcid,
        url,
        abstract,
        keywords,
        citation_count,
        is_featured,
        created_at,
        updated_at
      FROM publications
      ORDER BY publication_date DESC, publication_id DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const [rows] = await pool.execute(sql);

    const [countRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM publications"
    );
    const total = countRows[0]?.total ?? 0;

    res.json({
      success: true,
      data: rows,
      page,
      pageSize,
      total,
    });
  } catch (error) {
    console.error("Error fetching publications:", error);
    res.status(500).json({
      success: false,
      message: error.message, // keep this while debugging
    });
  }
};

/**
 * GET /api/publications/search?title=...
 * Optional query params: page, pageSize
 */
export const getPublicationsByTitle = async (req, res) => {
  const { title } = req.query;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Query parameter 'title' is required",
    });
  }

  const page = toInt(req.query.page || "1", 1);
  const pageSize = toInt(req.query.pageSize || "20", 20);
  const offset = (page - 1) * pageSize;

  const pattern = `%${title}%`;

  try {
    // Only one placeholder: the LIKE pattern
    const sql = `
      SELECT
        publication_id,
        title,
        publication_type,
        journal_name,
        publication_date,
        doi,
        pmid,
        pmcid,
        url,
        abstract,
        keywords,
        citation_count,
        is_featured,
        created_at,
        updated_at
      FROM publications
      WHERE title LIKE ?
      ORDER BY publication_date DESC, publication_id DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const [rows] = await pool.execute(sql, [pattern]);

    const [countRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM publications WHERE title LIKE ?",
      [pattern]
    );
    const total = countRows[0]?.total ?? 0;

    res.json({
      success: true,
      data: rows,
      page,
      pageSize,
      total,
    });
  } catch (error) {
    console.error("Error searching publications by title:", error);
    res.status(500).json({
      success: false,
      message: error.message, // keep this while debugging
    });
  }
};
