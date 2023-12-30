import { getUsers } from '../../controllers/registerController.js';
import express from 'express';
const router = express.Router();

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
    console.log(`POST request run on register/`)
    getUsers(req, res)
})

export default registerRouter;