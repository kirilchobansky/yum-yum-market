import express from 'express';
import isAuth from '../middlewares/isAuth';
import ordersService from '../services/ordersService';

const router = express.Router();

router.use(isAuth);

router.post('/create', async (req: any, res) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
        res.status(401).send('Cart Is Empty!');
        return;
    }

    try {
        await ordersService.deleteExistingOrders(req.user.id);
        const newOrder = await ordersService.createNewOrder({...requestOrder, user: req.user.id});
        res.send(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurs with payment');
    }
});

router.get('/new-order-current-user', async (req: any, res) => {
    const order = await ordersService.getOrderByUser(req.user.id);
    if(!order){
        res.status(401);
        return;
    }
    res.status(200).send(order);
});

export default router;