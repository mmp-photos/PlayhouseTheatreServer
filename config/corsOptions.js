import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials
    origin: ['https://playhouseacademy.onrender.com', 'https://playhouseacademy.onrender.com/backstage']
};

export default corsOptions;