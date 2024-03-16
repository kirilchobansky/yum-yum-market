import express from 'express';
const router = express.Router();

import foodController from './controllers/foodController';
import authController from './controllers/authController';

router.use('/api/foods', foodController);
router.use('/api/users', authController);

export default router;
