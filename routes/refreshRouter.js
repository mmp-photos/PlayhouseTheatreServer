// import express from 'express';
// const router = express.Router();
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// const refreshTokenController = require('../controllers/refreshTokenController');
// const refreshRouter = 
// router.get('/', refreshTokenController.handleRefreshToken);

// export default { refreshRouter };

const express = require('express');
const refreshRouter = express.Router();
import refreshTokenController from '../controllers/refreshTokenController.js';

refreshRouter.get('/', refreshTokenController.handleRefreshToken);

export default refreshRouter;