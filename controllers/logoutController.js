import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const users = require('../models/users.json');
const usersDB = {
    users: users,
    setUsers: function(data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const handleLogout = async (req, res) => {
    //on Client delete access token//
    console.log(`Lougout route has run`)
    const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204);
        else {
        const refreshToken = cookies.jwt;
        console.log(refreshToken)        
        const sql = `UPDATE users SET refresh_token = NULL WHERE refresh_token = '${refreshToken}'`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            })
        return res.sendStatus(204)
        }
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
    res.sendStatus(204)
    console.log(`Cookie was cleared`);
    }

export default { handleLogout }