import 'dotenv/config';
import { pool } from '../data/database2.js';

  const sql = 'SELECT * from academy_classes';
  async function getAllClasses(req, res) {
    console.log(`Request for all classes`);
    try {
        const connection = await pool.getConnection();
        console.log(`Database is connected`);
        try {
            const [rows, fields] = await connection.query(sql);
            res.status(200).json(rows);
            return;
        } finally {
            connection.release(); // Release the connection after query execution
            console.log('Connection was released');
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  export default { getAllClasses };