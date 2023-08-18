
const whitelist = [
    //list out domains you trust that need to communicate with your service
    'https://test.com',
    'http://127.0.0.1:55000',
    'http://localhost:55000'
];

export const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus:200
}