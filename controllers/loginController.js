import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const fsPromises = require('fs').promises;
const path = require('path');
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
require('dotenv').config();

import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export async function loginUser(req, res) {
    console.log(`The loginUser route has run`)
    const email = req.body.email
    const password = req.body.password

    const findUser = connection.query(
        `SELECT * FROM users WHERE email = '` + email + `'`,
        function(err, rows, fields) {
            if(rows.length < 1){
                console.log(`No User was found`)
                return res.status(500).json({"Users": "No Users found"})
            }
            if(rows.length == 1) {
                rows.forEach(row => {
                    console.log(row.password)
                    return row.password
                })
            }
    })
}

export default loginUser;