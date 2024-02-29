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
  
  async getFeaturedClasses() {
    return classModel.getFeaturedClasses();
  }

  async addNewClass(newClassData) {
    return classModel.addNewClass(newClassData);
  }
}

export default ClassService;
