//Import statements//
import cors from 'cors';
import indexRouter from './routes/indexRouter.js';
import employeeRouter from './routes/api/employeeAPI.js';
import registerRouter from './routes/api/registerAPI.js';
import loginRouter from './routes/api/loginAPI.js';
import refreshRouter from './routes/refreshRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import classesRouter from './routes/classesRouter.js';

import express from 'express';
const app = express();
const PORT = process.env.PORT || 3500;

import { corsOptions } from './config/corsOptions.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import verifyJWT from './middleware/verifyJWT.js';
import credentials from './middleware/credentials.js';
import cookieParser from 'cookie-parser';

app.use(cors(credentials))
app.use(cors(corsOptions))
app.use(cors(verifyJWT))

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.path}`)
    next()
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use('/', express.static('public'))


//Routes//
app.use('/', indexRouter)
app.use('/classes', classesRouter);
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/refresh', refreshRouter)
app.use('/logout', logoutRouter)
// app.use(verifyJWT)
app.use('/employee', employeeRouter)

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