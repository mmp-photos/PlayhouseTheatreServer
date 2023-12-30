import express from 'express';
const router = express.Router();
import authController from '../../controllers/authController.js';

const authRouter = 
router.post('/', authController.handleLogin);

export default authRouter;