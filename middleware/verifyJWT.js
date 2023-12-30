import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import jwt from 'jsonwebtoken';
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers['authorization'])
    if(!authHeader){
        console.log(`Not accepted`);
        return res.sendStatus(401)
    }
    console.log(authHeader)
    const token = authHeader.split(' ')[1]
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403)
            req.user = decoded.username
            next()
        }
    )
};

export default verifyJWT;