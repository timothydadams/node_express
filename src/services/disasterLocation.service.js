import * as helpers from '../utils/helper.util.js';
import * as general from '../configs/general.config.js';
///import { Users } from '../models/users.model.js';
import { PrismaClient } from '@prisma/client';

import winstonLogger from '../middleware/logging.middleware.js';

const prisma = new PrismaClient()

const loggingEnabled = true;

export const getById = async (id) => {
  const res = await prisma.bOM_DisasterLocation.findUnique({
    where: {
      "ItemGUID":id,
    }
  });

  loggingEnabled && winstonLogger.info(JSON.stringify(res));

  if (res) {
    return {event:res};
  } else {
    return {error:{message:"failed to retrieve event"}};
  }

}

export const getAllWithCount = async (page = 1) => {

  const res = await prisma.bOM_DisasterLocation.findMany();

  if (res) {
    return {
      "events": res,
      "count":res.length,
    }
  } else {
    return {error:{message:"failed to retrieve events"}};
  }
  
}

export const create = async ({
  Event
}) => {

  if (!Event) return {error: {message: `event cannot be null`}};

  const res = await prisma.bOM_DisasterLocation.create({
    data: {
      Event
    }
  });
  loggingEnabled && winstonLogger.info(JSON.stringify(res));

  return {Event:res};
}

export const update = async (id, {
  Event
}) => {
  const res = await prisma.bOM_DisasterLocation.update({
    where:{
      "ItemGUID": id,
    },
    data: {
      Event
    }
  });

  if (res) {
    loggingEnabled && winstonLogger.info(`updated event ${id}`);
    return {event:res};
  } else {
    winstonLogger.info(`error updating event ${id}`);
    return {error:{message: "update failed, event does not exist"}};
  }
}

export const remove = async (id) => {

  const { count } = await prisma.bOM_DisasterLocation.delete({
    where:{"ItemGUID":id},
  });

  let returnObj = {};

  if ( count != 0 ) {
    returnObj["message"] = `event ${id} deleted`;
  } else {
    returnObj["error"] = {message: 'delete failed'}
  }
  loggingEnabled && winstonLogger.info(JSON.stringify(returnObj));
  return returnObj;
}
