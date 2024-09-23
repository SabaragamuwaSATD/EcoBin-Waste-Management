import express from 'express';
import { getSchedules, createSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/', getSchedules);
router.post('/', createSchedule);

export default router;