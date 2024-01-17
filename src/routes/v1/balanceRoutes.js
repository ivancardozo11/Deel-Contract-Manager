import express from 'express';
import { getProfile } from '../../middleware/getProfile.js';
import { depositBalance } from '../../controllers/balanceController.js';

const router = express.Router();

router.post('/deposit/:userId', getProfile, depositBalance);

export default router;
