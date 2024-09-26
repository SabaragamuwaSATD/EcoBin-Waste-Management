import express from 'express';
import { getStaff, addStaff, updateAttendance, getStaffUsers } from '../controllers/authorityController.js';

const router = express.Router();

router.get('/staff', getStaff);
router.post('/staff', addStaff);
router.post('/attendance', updateAttendance);

// Route to fetch staff users
router.get("/", getStaffUsers);

export default router;