import winstonLogger from '../middleware/logging.middleware.js';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const loggingEnabled = true;

export const getOneByGUID = async (req, res, next) => {
  const id = req.params.id;
  try {

    const disaster = await prisma.bOM_DisasterLocation.findUnique({
      where: {
        "ItemGUID":id,
      }
    });
  
    loggingEnabled && winstonLogger.info(JSON.stringify(disaster));
  
    if (disaster) {
      res.status(200).json({disaster});
    } else {
      res.status(204).json({error:{message:"failed to retrieve event"}});
    }

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.sendStatus(204);
    }
    winstonLogger.error(`Error getting ${req.params.id}`, err.message);
    next(err);
  }
}


export const getAll = async (req, res, next) => {
  try {
    
    const disasters = await prisma.bOM_DisasterLocation.findMany();

    if (!disasters) return res.status(400).json({error:{message:"failed to retrieve events"}})

    res.json({
      disasters,
      "count":disasters.length,
    })

  } catch (err) {
      winstonLogger.error(`Error getting all records`, err.message);
      next(err);
  }
}


export const create = async (req, res, next) => {
  const { Event } = req.body;
  if (!Event) return res.status(400).json({error: {message: `event cannot be null`}});


  try {

    const disaster = await prisma.bOM_DisasterLocation.create({
      data: {
        Event
      }
    });

    loggingEnabled && winstonLogger.info(JSON.stringify(disaster));

    if (!disaster) return res.status(400).json({error: {message: `could not create disaster`}})
    
    res.json(disaster)
    
  } catch (err) {
    winstonLogger.error(`Error creating record`, err.message);
    next(err);
  }
}


export const update = async (req, res, next) => {
  const id = req.params.id;
  const { Event } = req.body;

  if (!id || !Event) return res.status(400).json({error: {message: `event cannot be null`}});

  try {
    const disaster = await prisma.bOM_DisasterLocation.update({
      where:{
        "ItemGUID": id,
      },
      data: {
        Event
      }
    });
  
    if (!disaster) return res.status(400).json({error: {message: `update failed`}});

    res.json(disaster);

  } catch (err) {
    winstonLogger.error(`Error updating record`, err.message);
    next(err);
  }
}


export const remove = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { count } = await prisma.bOM_DisasterLocation.delete({
      where:{"ItemGUID":id},
    });
  
    let returnObj = {};

    if ( count != 0 ) {
      returnObj["message"] = `disaster ${id} deleted`;
    } else {
      returnObj["error"] = {message: 'delete failed'}
    }

    loggingEnabled && winstonLogger.info(JSON.stringify(returnObj));

    res.json(returnObj);

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.sendStatus(204);
    }
    winstonLogger.error(`Error deleting record`, err.message);
    next(err);
  }
}

