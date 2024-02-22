//Import statements//
import cors from 'cors';
import indexRouter from './routes/indexRouter.js';
import adminRouter from './routes/adminRouter.js';
import employeeRouter from './routes/api/employeeAPI.js';
import registerRouter from './routes/api/registerAPI.js';
import refreshRouter from './routes/refreshRouter.js';
import authRouter from './routes/api/authAPI.js';
import logoutRouter from './routes/logoutRouter.js';
import classesRouter from './routes/classesRouter.js';

import express from 'express';
const app = express();
const PORT = process.env.PORT || 3500;

import corsOptions from './config/corsOptions.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import verifyJWT from './middleware/verifyJWT.js';
import credentials from './middleware/credentials.js';
import cookieParser from 'cookie-parser';

app.use(credentials)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
// app.use(cors(corsOptions))
// app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.path}`)
    next()
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
//Routes//
app.use('/classes', classesRouter); // Specific route for '/classes' endpoint
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter); // Specific route for other root-level endpoints
app.use('/register', registerRouter)
app.use('/refresh', refreshRouter)
app.use(verifyJWT)
app.use('/employee', employeeRouter)
app.use('/logout', logoutRouter)

// Static files and catch-all route
app.use(express.static('public'));
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

//404 Redirect//
app.all('*', (req, res) => {
    res.status(404)
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

//Error handling//
// app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));