import { Prisma, PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export default Prisma;


/*import { Sequelize } from 'sequelize';
import winstonLogger from '../middleware/logging.middleware.js';

export const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect: 'mssql',
        logging: false, //(msg) => winstonLogger.info(`[sequelize]: ${msg}`),
        dialectOptions: {
            // Observe the need for this nested `options` property for MSSQL
            options: {
                // Your tedious options here
                //useUTC: false,
                //dateFirst: 1,
            },
        },
    }
);*/
