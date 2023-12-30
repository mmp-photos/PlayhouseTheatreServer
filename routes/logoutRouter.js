import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const express = require('express');
const logoutRouter = express.Router();
import logoutController from '../controllers/logoutController.js';

logoutRouter.get('/', logoutController.handleLogout);

export default logoutRouter