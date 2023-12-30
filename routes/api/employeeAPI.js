import express from 'express';
const employeeRouter = express.Router();
import * as employeeController from '../../controllers/employeeController.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

employeeRouter.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

employeeRouter.route("/:id")
    .get(employeeController.findEmployee)

export default employeeRouter;