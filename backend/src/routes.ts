import express from 'express';
const router = express.Router();

import foodController from './controllers/foodController';
import authController from './controllers/authController';

router.use('/api/foods', foodController);
router.use('/api/auth', authController);

export default router;
