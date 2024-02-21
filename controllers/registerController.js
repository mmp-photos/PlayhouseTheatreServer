import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const fsPromises = require('fs').promises;
const path = require('path');
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
require('dotenv').config();

import mysql from 'mysql2';
import bcrypt from 'bcrypt';


export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


export async function getUsers(req, res) {
    const randomDigits = Math.floor(Math.random() * 9000 + 1000)
    const password = req.body.password
    const hashedPwd = await bcrypt.hash(password, 10)
    const created_on = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const user_type = req.body.user_type;
    const admin = req.body.admin;

    let id = (first_name[0]+randomDigits+last_name[0])
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
}


export default { getUsers }