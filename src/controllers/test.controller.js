import * as services from '../services/test.service.js';
import winstonLogger from '../middleware/logging.middleware.js';

export const get_one = async (req, res, next) => {
  try {
    res.json(await services.getById(req.params.id));
  } catch (err) {
    winstonLogger.error(`Error getting ${req.params.id}`, err.message);
    next(err);
  }
}

export const get_all = async (req, res, next) => {

  try {
      res.json(await services.getAllWithCount(req.query.page));
  } catch (err) {
      winstonLogger.error(`Error getting all records`, err.message);
      next(err);
  }
}

export const create = async (req, res, next) => {
  try {
    res.json(await services.create(req.body));
  } catch (err) {
    winstonLogger.error(`Error creating record`, err.message);
    next(err);
  }
}

export const update = async (req, res, next) => {
  try {
    res.json(await services.update(req.params.id, req.body));
  } catch (err) {
    winstonLogger.error(`Error updating record`, err.message);
    next(err);
  }
}

export const remove = async (req, res, next) => {
  try {
    res.json(await services.remove(req.params.id));
  } catch (err) {
    winstonLogger.error(`Error deleting record`, err.message);
    next(err);
  }
}
