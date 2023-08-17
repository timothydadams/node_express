import express from 'express';
const router = express.Router();
import * as controller from '../controllers/disasterLocation.controller.js';
import { authenticationHandler } from '../controllers/authentication.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

/* GET programming languages. */
router.get('/', controller.getAll);

/* GET 1 programming language */
router.get('/:id', controller.getOneByGUID);

/* POST programming language */
router.post('/', controller.create);

/* PUT programming language */
router.put('/:id', controller.update);

/* DELETE programming language */
router.delete('/:id', controller.remove);

export const disasterLocationsRouter = router;
