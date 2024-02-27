// classService.js
import ClassModel from '../models/classModel.js';

const classModel = new ClassModel();

class ClassService {
  async getClassById(classId) {
    return classModel.getClassById(classId);
  }

  async getAllClasses() {
    return classModel.getAllClasses();
  }
}

export default ClassService;
