import {getClasses, getUsers} from '../data/database.js';
import express from 'express';
const classesRouter = express.Router();

classesRouter.get('/index(.html)?', async (req, res) => {
        console.log(`Classes route success!`)
        const classes = await getClasses()
        console.log(classes);
        res.json(classes);
    });

classesRouter.post('/index(.html)?', async (req, res) => {
    console.log(`Post request run on classes/`)
    let rows = await getUsers(req, res);
    // console.log(rows)
    // res.status(200).json(rows);
})

export default classesRouter;