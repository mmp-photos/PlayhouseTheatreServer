import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const express = require('express');
const router = express.Router();
import refreshTokenController  from './../controllers/refreshTokenController.js';
const refreshRouter = express.Router();
refreshRouter.get('/', refreshTokenController.handleRefreshToken);

export default refreshRouter;