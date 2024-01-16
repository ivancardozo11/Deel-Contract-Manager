import express from 'express';
import contractRoutes from './contractRoutes.js';
// import jobRoutes from './jobRoutes.js';
// import balanceRoutes from './balanceRoutes.js';
// import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/contracts', contractRoutes);
// router.use('/jobs', jobRoutes);
// router.use('/balances', balanceRoutes);
// router.use('/admin', adminRoutes);

export default router;
