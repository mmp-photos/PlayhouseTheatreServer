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
                        return res.status(500).json({ error: 'Username and Password do not match' });
                    }

                    if (result) {
                        console.log(`Password Comparison successful`)
                        const user = {
                            id: rows[0].id,
                            user_id: rows[0].user_id,
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

                        const response = {
                            status: 200,
                            message: 'Success',
                            user: {
                                id: rows[0].id,
                                user_id: rows[0].user_id,
                                first_name: rows[0].first_name,
                                last_name: rows[0].last_name
                            }
                        };
                        console.log(`Response is: ${response.user.user_id}`)
                        console.log(`The comparision was complete and the JWT was created`)

                        const updateSql = `UPDATE users SET refresh_token = ? WHERE user_id = ?`;
                        connection.query(updateSql, [refreshToken, user.id], function (err, result) {
                            if (err) {
                                console.error('Error updating refresh token:', err);
                                return res.status(500).json({ error: 'Internal server error' });
                            }
                            console.log(result.affectedRows + " record(s) updated");
                        });

                        res.setHeader('Content-Type', 'application/json');

                        // Creates Secure Cookie with refresh token
                        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                        
                        // Send authorization roles and access token to user
                        res.status(200).json(response);                        
                    } else {
                        return res.status(401).json({ error: 'Username and Password do not match' });
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

async function handlePasswordChange(req, res){
    const userId = req.body.userId;
    const password1 = req.body.password1;
    const password2 = req.body.password2
    const email = req.body.email;

    if(password1 === password2){
        let hashedPwd = await bcrypt.hash(password, 10);
        return hashedPwd;
    };

    const emailCheck = `SELECT * FROM users WHERE EXISTS (SELECT * from users where email = '${email}')`
    let emailExists = await pool.query(emailCheck)
    const idCheck = `SELECT * FROM users WHERE EXISTS (SELECT * from users where user_id = '${id}')`
    let idExists = await pool.query(idCheck)
    console.log(idExists);
    if(!idExists[0].length && !emailExists[0].length){
        const sql = `INSERT INTO users (user_id, created_at, first_name, last_name, email, password, role) VALUES ('${id}', '${created_on}', '${first_name}', '${last_name}', '${email}', '${hashedPwd}', '${user_type}')`;
        await pool.query(sql)
        res.status(200).json({ 'first_name': first_name, 'last_name': last_name })
    }
    else{
        res.status(400).json({"message": "Id already exists"})
    }
};

export default { handleLogin, handlePasswordChange };
