import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import cors from 'cors';
import indexRouter from './routes/indexRouter.js';
import apiRouter from './routes/apiRouter.js';
import adminRouter from './routes/adminRouter.js';
import employeeRouter from './routes/api/employeeAPI.js';
import registerRouter from './routes/api/registerAPI.js';
import refreshRouter from './routes/refreshRouter.js';
import authRouter from './routes/api/authAPI.js';
import logoutRouter from './routes/logoutRouter.js';
import classesRouter from './routes/classesRouter.js';

const app = express();

import corsOptions from './config/corsOptions.js';
import verifyJWT from './middleware/verifyJWT.js';
import credentials from './middleware/credentials.js';
import cookieParser from 'cookie-parser';

app.use(cors(corsOptions));


app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'index.html'));
});

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.path}`);
    next();
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/classes', classesRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/register', registerRouter);
app.use('/refresh', refreshRouter);
app.use(verifyJWT);
app.use('/employee', employeeRouter);
app.use('/logout', logoutRouter);

app.use((req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile('./views/404.html', {root: __dirname});
    } else if(req.accepts('json')){
        res.json({error: '404 - not found'});
    } else {
        res.type('txt').send('404 Not-Found');
    }
});

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile('./views/404.html', {root: __dirname});
    }
    else if(req.accepts('json')){
        res.json({error: '404 - not found'});
    }
    else {
        res.type('txt').send('404 Not-Found');
    }
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log('Listening on port', PORT));