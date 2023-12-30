export const allowedOrigins = ['http://127.0.0.1:5500', 'http://127.0.0.1:3500', 'http://localhost:3500'];

export const corsOptions = {
    origin: (origin, callback) =>{
        // console.log(origin);
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}