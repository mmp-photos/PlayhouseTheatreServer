import { allowedOrigins } from './../config/corsOptions.js';

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true)
    }
};

export default credentials;