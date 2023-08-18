import express from 'express';
const router = express.Router();
import { register } from '../controllers/auth/register.controller.js';

import { disasterLocationsRouter } from './disasterLocations.route.js';

//base app routes
router.post('/register', register);


router.use('/disasters', disasterLocationsRouter);


export default router;