import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
    origin: (origin, callback) => {
        console.log('Origin:', origin);
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
            console.log(`Found in allowedOrigins`)
        } else {
            callback(new Error('Not allowed by CORS'));
            console.log(`NOT Found in allowedOrigins`)
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials
};

export default corsOptions;