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











// import ClassModel from '../models/classModel.js';

// const classModel = new ClassModel();

// export const getClassById = async (req, res) => {
//   console.log(`Get class by ID on classController`)
//   const classId = req.params.classID;
//   try {
//     const classData = await classModel.getClassById(classId);
//     if (classData.length === 0) {
//       return res.status(404).json({ message: 'Class not found' });
//     }
//     res.json(classData);
//   } catch (error) {
//     console.error('Error retrieving class data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
// export const getAllClasses = async (req, res) => {
//   console.log(`Get all classes on classController`)
//   try {
//     const classData = await classModel.getAllClasses();
//     if (classData.length === 0) {
//       return res.status(404).json({ message: 'No classes found' });
//     }
//     res.json(classData);
//   } catch (error) {
//     console.error('Error retrieving class data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
// ;
