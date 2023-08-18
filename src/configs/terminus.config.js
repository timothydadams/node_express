/* Functions for graceful shutdowns via terminus */
import winstonLogger from "../middleware/logging.middleware.js";

import { HealthCheckError } from "@godaddy/terminus";


const onSignal = () => {
    winstonLogger.info('server is starting cleanup')
    // start cleanup of resource, like databases or file descriptors
    return Promise.all([
        // clean-up logic, like closing database connections
    ]);
}

const onShutdown = () => {
    winstonLogger.info('cleanup finished, server is shutting down');
}
  
const onHealthCheck = async () => {
    // checks if the system is healthy, like the db connection is live
    // resolves, if health, rejects if not
    const errors = [];
    const completedPromises = await Promise.all([

    ]);

    completedPromises.map(p => p.catch(e => {
        errors.push(e);
        return undefined;
    }))

    
    if (errors.length) {
        throw new HealthCheckError('healthcheck failed', errors);
    }
}

const logger = (err) => {
    winstonLogger.error(err);
}

export const terminusOptions = {
    // health check options
    healthChecks: {
      '/healthcheck': onHealthCheck,    // a function accepting a state and returning a promise indicating service health,
      verbatim: true,                 // [optional = false] use object returned from /healthcheck verbatim in response,
      __unsafeExposeStackTraces: true // [optional = false] return stack traces in error response if healthchecks throw errors
    },
    //caseInsensitive,                  // [optional] whether given health checks routes are case insensitive (defaults to false)
  
    //statusOk,                         // [optional = 200] status to be returned for successful healthchecks
    //statusOkResponse,                 // [optional = { status: 'ok' }] status response to be returned for successful healthchecks
    //statusError,                      // [optional = 503] status to be returned for unsuccessful healthchecks
    //statusErrorResponse,              // [optional = { status: 'error' }] status response to be returned for unsuccessful healthchecks
  
    // cleanup options
    timeout: 1000,                    // [optional = 1000] number of milliseconds before forceful exiting
    //signal,                           // [optional = 'SIGTERM'] what signal to listen for relative to shutdown
    signals: ["SIGINT","SIGTERM"],    // [optional = []] array of signals to listen for relative to shutdown
    //useExit0,                         // [optional = false] instead of sending the received signal again without beeing catched, the process will exit(0)
    //sendFailuresDuringShutdown,       // [optional = true] whether or not to send failure (503) during shutdown
    //beforeShutdown,                   // [optional] called before the HTTP server starts its shutdown
    onSignal,                         // [optional] cleanup function, returning a promise (used to be onSigterm)
    onShutdown,                       // [optional] called right before exiting
    //onSendFailureDuringShutdown,      // [optional] called before sending each 503 during shutdowns
  
    // both
    logger                            // [optional] logger function to be called with errors. Example logger call: ('error happened during shutdown', error). See terminus.js for more details.
};