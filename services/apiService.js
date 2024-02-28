// ApiService.js
import ApiModel from '../models/apiModel.js';

const apiModel = new ApiModel();

class ApiService {
  async getAllLocations() {
    return apiModel.getAllLocations(); // Corrected method call
  }
  async getAllPeople() {
    return apiModel.getAllPeople(); // Corrected method call
  }
  async getAllStatuses() {
    return apiModel.getAllLocations(); // Corrected method call
  }
  async getAllPeople() {
    return apiModel.getAllPeople(); // Corrected method call
  }
  async getAllTerms() {
    return apiModel.getAllTerms(); // Corrected method call
  }
  async getAllStatuses() {
    return apiModel.getAllStatuses(); // Corrected method call
  }
  async getAllAudiences() {
    return apiModel.getAllAudiences(); // Corrected method call
  }
}

export default ApiService;
