import Prisma from '../configs/db.config.js'
import winstonLogger from './logging.middleware.js';

const isProduction = process.env.NODE_ENV === 'dev' ? false : true;


export const errorHandler = (err, req, res, next) => {

    winstonLogger.error(err);

    //handle prisma related errors differently, need to build this out more
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        //break out the error codes for known issues

        return isProduction
            ? res.status(404).json({error:{message:'Not Found'}})
            : res.status(500).json({error:{message:err.message}})

    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        return isProduction
            ? res.status(404).json({error:{message:'Not Found'}})
            : res.status(500).json({error:{message:err.message}})

    }

    if (err instanceof Prisma.PrismaClientRustPanicError) {
        return res.status(500).json({error:{message:'fatal error'}})
    }


    //catch all for other errors
    return isProduction
        ? res.status(500).json({error:{message:'unknown error, please refer to logs'}})
        : res.status(500).json({error:{message:err.message}});

}