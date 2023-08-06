import * as helpers from '../utils/helper.util.js';
import * as general from '../configs/general.config.js';
import { Users } from '../models/users.model.js';
import winstonLogger from '../middleware/logging.middleware.js';

const loggingEnabled = true;

export const getById = async (id) => {
  const res = await Users.findByPk(id);

  loggingEnabled && winstonLogger.info(JSON.stringify(res));

  if (res) {
    return {user:res};
  } else {
    return {error:{message:"failed to retrieve user"}};
  }

}

export const getAllWithCount = async (page = 1) => {

  const {count, rows} = await Users.findAndCountAll({
    ...helpers.paginate({ page , pageSize: general.listPerPage })
  });

  const meta = {"page":Number(page)};

  return {
    count,
    users:rows,
    ...(rows.length > 0 && meta)
  }
}

export const create = async ({
  firstName,
  lastName,
}) => {

  if (!firstName) return {error: {message: `firstName cannot be null`}};
  if (!lastName) return {error: {message: `lastName cannot be null`}};

  const res = await Users.create({
    firstName,
    lastName,
  });
  loggingEnabled && winstonLogger.info(JSON.stringify(res));

  return {user:res};
}

export const update = async (id, {
  firstName,
  lastName
}) => {
  const res = await Users.update({firstName, lastName},{
    where:{id},
  });
  let resval = res[0];

  if (resval === 1) {
    loggingEnabled && winstonLogger.info(`updated user ${id}`);
    let updatedUser = await Users.findByPk(id);
    return {user:updatedUser};
  } else {
    winstonLogger.info(`error updating user ${id}`);
    return {error:{message: "update failed, user does not exist"}};
  }
}

export const remove = async (id) => {

  const res = await Users.destroy({
    where:{id},
  });

  let returnObj = {};

  if (res === 1 ) {
    returnObj["message"] = `user ${id} deleted`;
  } else {
    returnObj["error"] = {message: 'delete failed'}
  }
  loggingEnabled && winstonLogger.info(JSON.stringify(returnObj));
  return returnObj;
}
