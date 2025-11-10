import { pool } from '../config/db.js';

export async function getAllWGs(req, res) {
    try {
        const [wgs] = await pool.execute(
            `SELECT publication_id, wg_code, wg_name, wg_description, focus_area 
             FROM working_groups 
             WHERE status = 'active'
             ORDER BY wg_code ASC`
        );

        res.status(200).json({
            success: true,
            data: wgs,
        });
    } catch (error) {
        console.error('Error fetching working groups:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}