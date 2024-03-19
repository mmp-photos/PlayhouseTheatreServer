// classesRouter.js
import express from 'express';
import InstructorService from '../services/instructorService.js';

const instructorRouter = express.Router();
const instructorService = new InstructorService();

// GET /instructor
// instructorRouter.get('/', async (req, res) => {
    // console.log(`All classes requested`)
    // try {
    //     const classData = await instructorService.getAllClasses();
    //     if (classData.length === 0) {
    //     return res.status(404).json({ message: 'No classes found' });
    //     }
    //     res.json(classData);
    // } catch (error) {
    //     console.error('Error retrieving class data:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }
    // });

// GET /instructor/:instructorId
instructorRouter.get('/id/:instructorId', async (req, res) => {
  console.log(`Requested instructor by ID`);
  const instructorId = req.params.instructorId;
  try {
    const classData = await instructorService.getInstructorById(instructorId);
    if (classData.length === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classData);
  } catch (error) {
    console.error('Error retrieving class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default instructorRouter;
