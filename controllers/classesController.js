// classesController.js
import ClassService from '../services/classService.js';

const classService = new ClassService();

export const getClassById = async (req, res) => {
  const classId = req.params.classID;
  try {
    const classData = await classService.getClassById(classId);
    res.json(classData);
  } catch (error) {
    console.error('Error retrieving class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classData = await classService.getAllClasses();
    res.json(classData);
  } catch (error) {
    console.error('Error retrieving class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllClassData = async (req, res) => {
  try {
    const classData = await classService.getAllClassData();
    res.json(classData);
  } catch (error) {
    console.error('Error retrieving class data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};