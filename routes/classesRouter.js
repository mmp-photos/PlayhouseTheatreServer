// classesRouter.js
import express from 'express';
import ClassService from '../services/classService.js';

const classesRouter = express.Router();
const classService = new ClassService();

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

// GET /classes/options_data - Move this route above the /:classID route
classesRouter.get('/options_data', async (req, res) => {
  console.log(`Options data for class form requested`)
  try {
    const classData = await classService.getSelectOptions;
    if (classData.length === 0) {
      return res.status(404).json({ message: 'Unable to retrieve options' });
    }
    res.json(classData);
  } catch (error) {
    console.error('Error retrieving class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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

classesRouter.post('/add', async (req, res) => {
  console.log(`Adding Class to Database`)
  const newClassData = req.body;
  console.log(newClassData);
  try {
    const classData = await classService.addNewClass(newClassData);
      return res.status(404).json({ message: 'Class not found' });
  } catch (error) {
    console.error('Error retrieving class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default classesRouter;
