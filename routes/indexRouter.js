import express from 'express';
const indexRouter = express.Router();
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

indexRouter.get('/index(.html)?', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
    console.log(__dirname);
})

indexRouter.get('/new-page.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
    console.log(__dirname);
})

export default indexRouter;