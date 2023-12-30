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
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
        return res.sendStatus(204);
    }
    
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken: ''}
    usersDB.setUsers({...otherUsers, currentUser})
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(usersDB.users)
    )

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
    res.sendStatus(204)
    console.log(`Cookie was cleared`)
};

export default { handleLogout }