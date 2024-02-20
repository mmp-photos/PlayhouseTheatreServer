import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log(req.headers['authorization'])
    if(!authHeader){
        console.log(`Not accepted`);
        return res.sendStatus(401)
    }
    // console.log(authHeader)
    const token = authHeader.split(' ')[1]
    // console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            console.log(err)
            next();
        }
    )
};

// function verifyJWT(req,res,next){
//     const token = req.headers['authorization']
//     if(!token) return res.sendStatus(401)
//     console.log(process.env.ACCESS_TOKEN_SECRET)
//    try{
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         req.user = decoded
//         next()
//    }catch(e){
//     consol
//     e.log(`Error: ${e}`)
//     next()
// }

export default verifyJWT;