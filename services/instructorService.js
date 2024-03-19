// classService.js
import InstructorModel from '../models/instructorModel.js';

const instructorModel = new InstructorModel();

class InstructorService {
  async getInstructorById(instructorId) {
    return instructorModel.getInstructorById(instructorId);
  }
};

export default InstructorService;
