import express from 'express';
import { getStaff, addStaff, updateAttendance } from '../controllers/authorityController.js';

const router = express.Router();

router.get('/staff', getStaff);
router.post('/staff', addStaff);
router.post('/attendance', updateAttendance);

export default router;