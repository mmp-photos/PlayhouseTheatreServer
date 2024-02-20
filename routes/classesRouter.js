import express from 'express';
const router = express.Router();
import classesController from '../controllers/classesController.js';
import authController from '../controllers/authController.js';

const classesRouter = 
router.get('/', classesController.getAllClasses);

export default classesRouter;