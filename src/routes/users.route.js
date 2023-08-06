import express from 'express';
const router = express.Router();
import * as controller from '../controllers/users.controller.js';

/* GET programming languages. */
router.get('/', controller.get_all);

/* GET 1 programming language */
router.get('/:id', controller.get_one);
  
/* POST programming language */
router.post('/', controller.create);

/* PUT programming language */
router.put('/:id', controller.update);

/* DELETE programming language */
router.delete('/:id', controller.remove);

export const usersRouter = router;
