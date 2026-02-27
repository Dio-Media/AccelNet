export const getAllParticipants = async (req, res) => {
  try {
    const [rows] = await pool.query(`
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
        i.institution_name AS institution
      FROM participants p
      LEFT JOIN institutions i ON i.id = p.institution_id
      ORDER BY p.first_name ASC
    `);

    res.json({
      data: rows.map(p => ({
        id: p.participants_id,
        name: `${p.first_name} ${p.last_name}`,
        role: p.academic_rank,
        affiliation: p.institution,
        specialty: p.department,
        pfp: p.profile_picture
      })),
      pagination: {
        count: rows.length,
        limit: parseInt(req.query.limit) || rows.length,
        page: parseInt(req.query.page) || 1
      }
    });

  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ message: "Failed to load participants" });
  }
};

export const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT 
        p.*,
        i.institution_name AS institution
      FROM participants p
      LEFT JOIN institutions i ON i.id = p.institution_id
      WHERE p.participants_id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching participant:", error);
    res.status(500).json({ message: "Failed to fetch participant" });
  }
};