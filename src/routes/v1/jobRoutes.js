import express from 'express';
const router = express.Router();

router.get('/unpaid');
router.post('/:job_id/pay');

export default router;
