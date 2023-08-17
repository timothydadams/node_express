import express from 'express';
import winstonLogger, { morganLogger } from './middleware/logging.middleware.js';
//import { sequelize } from './configs/db.config.js';
//import { usersRouter } from './routes/users.route.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.SERVER_PORT || 9000;

const app = express();

/******* uncomment to integrate https support 
 * requires cert/key generation (see readme.md)
 * update https.config.js

import https from 'https';
import { serverOpts } from './configs/https.config.js';
const server = https.Server(serverOpts, app);

*/


//use express JSON handling for request body parsing in controllers
app.use(express.json());

app.use(cookieParser());

//load custom logging middleware
winstonLogger.info('using morgan to monitor http requests');
app.use(morganLogger);

//just a test endpoint for browser
app.get('/', (req, res) => {
    res.json({'message': 'listening...'});
})

//load routes
app.use('/api', router);

//initialize db connection & start the server
try {
    //await sequelize.authenticate();
    winstonLogger.info('DB connection established....');
    winstonLogger.info(`Running in '${process.env.NODE_ENV}' environment`);
    //await sequelize.sync({force: process.env.NODE_ENV !== 'production' ? true : false});
    winstonLogger.info("sequelize models synchronized successfully with db");

    //ready for https? use server.listen
    app.listen(PORT, () => {
        winstonLogger.info(`Server is listening on port ${PORT}`);
    });

} catch (error) {
    winstonLogger.error('Unable to connect to the database, server failed to start', error);
}

export { app };