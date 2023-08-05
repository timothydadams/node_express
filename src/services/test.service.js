import * as helpers from '../utils/helper.util.js';
import * as general from '../configs/general.config.js';
import { Test } from '../models/test.model.js';

export const getById = async (id) => {
  const res = await Test.findOne({
    where: { id },
  });

  if (res === null) {
    return `Id ${id} not found`;
  } else {
    return res;
  }
}

export const getAllWithCount = async (page = 1) => {

  const {count, rows} = await Test.findAndCountAll({
    ...helpers.paginate({ page , pageSize: general.listPerPage })
  });

  const meta = {"page":Number(page)};

  return {
    count,
    rows,
    ...(rows.length > 0 && meta)
  }
}

export const create = async ({
  firstName,
  lastName,
}) => {
  const res = await Test.create({
    firstName,
    lastName,
  });

  return res;
}

export const update = async (id, {
  firstName,
  lastName
}) => {
  const res = await Test.update({firstName, lastName},{
    where:{id},
  })

  return res;
}

export const remove = async (id) => {
  const res = await Test.destroy({
    where:{id},
  })

  return res;
}
