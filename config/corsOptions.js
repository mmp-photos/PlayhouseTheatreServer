import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
    origin: (origin, callback) => {
        // console.log(origin)
        if (allowedOrigins.indexOf(origin) == -1 || !origin) {
            console.log(allowedOrigins.indexOf(origin));
            callback(null, true)
        } else {
            console.log(allowedOrigins.indexOf(origin));
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

export default corsOptions;