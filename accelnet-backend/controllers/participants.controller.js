import { pool } from '../config/db.js';

export async function getAllParticipants(req, res) {
      try {
          const [participants] = await pool.query(
        `SELECT
          p.participants_id,
          p.first_name,
          p.last_name,
          p.email,
          p.academic_rank,
          i.institution_name,
          p.department,
          p.google_scholar,
          p.linkedin,
          p.profile_picture
          FROM participants p
          LEFT JOIN institutions i ON p.institution_id = i.institution_id;`
      );

      res.status(200).json({
        success: true,
        data: participants,
      });
      }
      catch(error){
        console.error('Error fetching participants:', error);
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          error: error.message,
        });
      }
    }
