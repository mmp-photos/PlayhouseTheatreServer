import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const users = require('../models/users.json');
const usersDB = {
    users: users,
    setUsers: function(data) {this.users = data}
}

import jwt from 'jsonwebtoken';
require('dotenv').config();

export const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden 

    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const accessToken = jwt.sign(
                { "username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            res.json({ accessToken })
        }
    )
        
};

export default { handleRefreshToken }