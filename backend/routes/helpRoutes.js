import express from 'express';
import { submitInquiry, getInquiries } from '../controllers/helpController.js';

const router = express.Router();

router.post('/', submitInquiry);
router.get('/', getInquiries);

export default router;