import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const users = require('../models/users.json');
const usersDB = {
    users: users,
    setUsers: function(data) {this.users = data}
}

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const handleLogin = async (req, res) => {
    console.log(`Auth function has`)
    const { username, password } = req.body
    console.log(`username from req = ${username}`)
    if(!username || ! password) return res.status(400).json({'message': "username and password are required"})
    const foundUser = usersDB.users.find(person => person.username === username)
    if(!foundUser) return res.sendStatus(401)
    
    const match = await bcrypt.compare(password, foundUser.password)
    if(match){
        const accessToken = jwt.sign(
            { "username": username },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '4800s'}
        );
        const refreshToken = jwt.sign(
            { "username": username },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        // SAVING REFRESH TOKEN TO CURRENT USER //
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken }
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        )
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
};

export default { handleLogin }