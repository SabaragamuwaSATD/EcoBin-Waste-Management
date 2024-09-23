import express from 'express';
import { getGarbageLocations, updateGarbageLocation } from '../controllers/garbageTrackerController.js';

const router = express.Router();

router.get('/', getGarbageLocations);
router.post('/', updateGarbageLocation);

export default router;