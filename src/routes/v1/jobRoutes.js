import express from 'express';
import { getProfile } from '../../middleware/getProfile.js';
import { getUnpaidJobs, payJob } from '../../controllers/jobController.js';

const router = express.Router();

router.get('/unpaid', getProfile, getUnpaidJobs);
router.post('/:job_id/pay', getProfile, payJob);

export default router;
