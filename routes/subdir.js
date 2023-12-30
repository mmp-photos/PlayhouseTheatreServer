import express from 'express';
const router = express.Router();
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get('/index.(html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'))
    console.log(`testing the index`);
});

router.get('/new-page(.html)?', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'new-page.html'))
    console.log(`testing the request for new-page - really checking`)
});

router.all('*', (req, res) => {
    res.status(404)
    console.log(`subdir 404 call`)
    if(req.accepts('html')) {
        res.sendFile('./views/404.html', {root: __dirname})
    }
    else if(req.accepts('json')){
        res.json({error: '404 - not found'})
    }
    else {
        res.type('txt').send('404 Not-Found')
    }
});

export default router;