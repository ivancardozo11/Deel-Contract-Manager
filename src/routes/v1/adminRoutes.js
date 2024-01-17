import express from 'express';
import { bestProfession, bestClients } from '../../controllers/adminController.js';
import { validateDateParams } from '../../middleware/dateValidation.js';
const router = express.Router();

router.get('/best-profession', validateDateParams, bestProfession);
router.get('/best-clients', bestClients);

export default router;
