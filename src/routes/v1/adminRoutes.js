import express from 'express';
import { getBestProfession, getBestClients } from '../../controllers/adminController.js';

const router = express.Router();

router.get('/best-profession', getBestProfession);
router.get('/best-clients', getBestClients);

export default router;
