// classesRouter.js
import express from 'express';
import ClassService from '../services/classService.js';

const classesRouter = express.Router();
const classService = new ClassService();

// GET /classes/:classID
classesRouter.get('/:classID', async (req, res) => {
  console.log(`Requested class by ID`)
  const classId = req.params.classID;
  try {
    const classData = await classService.getClassById(classId);
    if (classData.length === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classData);
  } catch (error) {
    console.error('Error retrieving class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /classes
classesRouter.get('/', async (req, res) => {
    console.log(`All classes requested`)
  try {
    const classData = await classService.getAllClasses();
    if (classData.length === 0) {
      return res.status(404).json({ message: 'No classes found' });
    }
    res.json(classData);
  } catch (error) {
    console.error('Error retrieving class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default classesRouter;


// import express from 'express';
// import { getClassById, getAllClasses } from '../controllers/classesController.js';

// const classesRouter = express.Router();

// // GET /classes/:classID
// classesRouter.get('/', getAllClasses );
// classesRouter.get('/:classID', getClassById);
// export default classesRouter;