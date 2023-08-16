import express from 'express';
const router = express.Router();

import { disasterLocationsRouter } from './disasterLocations.route.js';

router.use('/disasters', disasterLocationsRouter);


export default router;