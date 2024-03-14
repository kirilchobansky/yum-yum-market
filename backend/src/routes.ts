import express from 'express';
const router = express.Router();

import foodController from './controllers/foodController';

router.use('/api/foods', foodController);

export default router;
