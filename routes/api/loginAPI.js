import express from 'express';
const router = express.Router();
import loginUser from '../../controllers/loginController.js';

const loginRouter = 
router.post('/', loginUser);

export default loginRouter;