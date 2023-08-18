import http from 'http';
//import https from 'https';
//import { serverOpts } from './configs/https.config.js';
import express from 'express';
import { createTerminus } from '@godaddy/terminus';
import { terminusOptions } from './configs/terminus.config.js';
import winstonLogger, { morganLogger } from './middleware/logging.middleware.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from './configs/cors.config.js';
import { errorHandler } from './middleware/errors.middleware.js';

const PORT = process.env.SERVER_PORT || 9000;
const app = express();
const server = http.createServer(app);

/******* HTTPS SUPPORT ******** 
 * requires cert/key generation (see readme.md)
 * update https.config.js
 * COMMENT OUT LINE 16
 * UNCOMMENT LINES 2,3, & 24 
/****************************/
//const server = https.Server(serverOpts, app);

createTerminus(server, terminusOptions);

//set up CORS support
app.use(cors(corsOptions));

//use express JSON handling for request body parsing in controllers
app.use(express.json());

app.use(cookieParser());

//load custom logging middleware
app.use(morganLogger);

//just a test endpoint for browser
app.get('/', (req, res) => {
    res.json({'message': 'listening...'});
})

//load routes
app.use('/api', router);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({error:"Not Found"})
    }
});

//add some standard error handling
app.use(errorHandler);


try {
    winstonLogger.info(`Running in '${process.env.NODE_ENV}' environment`);

    server.listen(PORT, () => {
        winstonLogger.info(`🚀 Server is listening on port ${PORT}`);
    });

} catch (error) {
    winstonLogger.error('Unable to connect to the database, server failed to start', error);
}

export { app };