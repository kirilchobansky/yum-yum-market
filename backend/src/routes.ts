import express from 'express';
const router = express.Router();

import foodsController from './controllers/foodsController';
import authController from './controllers/userController';
import commentsController from './controllers/commentsController';
import ordersController from './controllers/ordersController'

router.use('/api/foods', foodsController);
router.use('/api/users', authController);
router.use('/api/comments', commentsController);
router.use('/api/orders', ordersController);

export default router;
