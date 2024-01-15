import express from 'express';
import { getProfile } from '../../middleware/getProfile.js';
import { depositToBalance } from '../../controllers/balanceController.js';

const router = express.Router();

router.post('/deposit/:userId', getProfile, depositToBalance);

export default router;