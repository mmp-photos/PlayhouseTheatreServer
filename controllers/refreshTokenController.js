// import bcrypt from 'bcrypt';
// import mysql from 'mysql2';
// import jwt from 'jsonwebtoken';
// import { pool } from './../data/database2.js';
// import 'dotenv/config';

//     const handleRefreshToken = (req, res) => {
//         const cookies = req.cookies
//         if(!cookies?.jwt) return res.sendStatus(401)
//         const refreshToken = cookies.jwt
//         const email = req.body.email;

//         pool.getConnection(function(err) {
//             pool.query(`SELECT * FROM users WHERE refresh_token = '` + refreshToken + `'`,
//                         function(err, rows, fields) 
//             {
//             if (rows.length <= 0) {
//                 return res.sendStatus(403)
//             } else {
//                 jwt.verify(rows[0].refresh_token,
//                     process.env.REFRESH_TOKEN_SECRET,
//                     (err, decoded) => {
//                         if(err || rows[0].email !== decoded.email) return res.sendStatus(403)
//                         const accessToken = jwt.sign(
//                             { "email": decoded.email}, 
//                             process.env.ACCESS_TOKEN_SECRET,
//                             {expiresIn: "30m"}
//                         )
//                         res.json({ accessToken })
//                     })
//             }
//             pool.end(function (err) {
//                 // all connections in the pool have ended
//               });
//         })
//     })
//     }
    
// export default { handleRefreshToken }

import jwt from 'jsonwebtoken';
import { pool } from './../data/database2.js';

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    
    const refreshToken = cookies.jwt;
    const email = req.body.email;

    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            connection.query(`SELECT * FROM users WHERE refresh_token = ?`, [refreshToken], (err, rows, fields) => {
                connection.release(); // Release the connection after executing the query

                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (rows.length <= 0) {
                    return res.sendStatus(403);
                }

                jwt.verify(rows[0].refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err || rows[0].email !== decoded.email) {
                        return res.sendStatus(403);
                    }

                    const accessToken = jwt.sign(
                        { email: decoded.email },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "30m" }
                    );
                    res.json({ accessToken });
                });
            });
        }).on('error', (err) => {
            console.error('Database connection error:', err);
            res.status(500).json({ error: 'Database connection error' });
        });
    } catch (error) {
        console.error('Unhandled error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { handleRefreshToken };