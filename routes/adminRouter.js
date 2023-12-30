import express from 'express';
const adminRouter = express.Router();
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

adminRouter.get('/|/index(.html)?', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'admin', 'index.html'))
    console.log(__dirname);
})

export default adminRouter;