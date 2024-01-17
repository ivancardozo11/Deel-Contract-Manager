import express from 'express';
import { getProfile } from '../../middleware/getProfile.js';
import { getContractById, getActiveContracts } from '../../controllers/contractController.js';

const router = express.Router();

router.get('/:id', getProfile, getContractById);
router.get('/', getActiveContracts);

export default router;
