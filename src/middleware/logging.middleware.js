//add logging of req / res
import { format as dateFormat, parseISO } from "date-fns";
import { createLogger, format, transports } from "winston";
import morgan from "morgan";

const loggerConfig = {
    format: format.combine(
        format.timestamp({format:'YYYY-MM-DD HH:mm:ss.SSS'}),
        format.errors({stack:true}),
        format.splat(),
        format.json(),
    ),
    level: process.env.LOG_LEVEL || 'warn',
    defaultMeta: { service: 'ncbm-api' },
    transports: [
        // - Write to all logs with level `info` and below to `combined.log`.
        // - Write all logs error (and below) to `error.log`.
        new transports.File({ filename: './logs/errors.log', level: 'error' }),
        new transports.File({ filename: './logs/combined.log' })
    ],
};

const winstonLogger = createLogger(loggerConfig);

export const morganLogger = morgan(
    //':method :url :status :res[content-length] - :response-time ms',
    function (tokens, req, res) {
        return JSON.stringify({
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            status: Number.parseFloat(tokens.status(req, res)),
            content_length: tokens.res(req, res, 'content-length'),
            response_time: Number.parseFloat(tokens['response-time'](req, res)),
        });
    },
    {
        stream: {
            write: (msg) => {
                const data = JSON.parse(msg);
                let txt = `${data.method} ${data.url} ${data.status} ${data.content_length} - ${data.response_time} ms`
                winstonLogger.http(`incoming request: ${txt}`, data);
            }
        }
    }
);


if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(new transports.Console({
        format:format.combine(
            format.colorize({all:true}),
            format.label({ label: 'API' }),
            format.printf(
              info => `${
                dateFormat(parseISO(info.timestamp), 'HH:mm:ss-SSS')
                } [${
                  info.level
                }] ${
                  info.label
                }: ${
                  info.message
                }`
            ),
        )})
    );
}

export default winstonLogger;