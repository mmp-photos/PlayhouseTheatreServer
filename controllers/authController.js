import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { pool } from '../data/database2.js';

const sql = 'SELECT * FROM users WHERE email = ?';

async function handleLogin(req, res) {
    console.log(`Email passed to handler is ${req.body.email}`);
    try {
        const connection = await pool.getConnection();
        console.log(`Database is connected`);
        try {
            const [rows, fields] = await connection.query(sql, [req.body.email]);

            if (rows.length > 0 && rows[0].password) {
                console.log(`Email was found in the database`);
                bcrypt.compare(req.body.password, rows[0].password, function(err, result) {
                    if (err) {
                        console.error('Error comparing passwords:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    if (result) {
                        console.log(`Password Comparison successful`)
                        const user = {
                            id: rows[0].id,
                            first_name: rows[0].first_name,
                            last_name: rows[0].last_name
                        };

                        const accessToken = jwt.sign(
                            { "email": rows[0].email },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '1m' }
                        );

                        const refreshToken = jwt.sign(
                            { "email": rows[0].email },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: '5d' }
                        );
                        console.log(`The comparision was complete and the JWT was created`)

                        const updateSql = `UPDATE users SET refresh_token = ? WHERE user_id = ?`;
                        connection.query(updateSql, [refreshToken, user.id], function (err, result) {
                            if (err) {
                                console.error('Error updating refresh token:', err);
                                return res.status(500).json({ error: 'Internal server error' });
                            }
                            console.log(result.affectedRows + " record(s) updated");
                        });
                        // Creates Secure Cookie with refresh token
                        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

                        // Send authorization roles and access token to user
                        res.json({ accessToken });                        
                    } else {
                        return res.sendStatus(400);
                    }
                });
            } else {
                return res.sendStatus(400);
            }
        } finally {
            connection.release(); // Release the connection after query execution
            console.log('Connection was released');
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default { handleLogin };
