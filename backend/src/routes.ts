import express from 'express';
const router = express.Router();

import foodsController from './controllers/foodsController';
import authController from './controllers/authController';
import commentController from './controllers/commentsController';

router.use('/api/foods', foodsController);
router.use('/api/users', authController);
router.use('/api/comments', commentController)

export default router;
