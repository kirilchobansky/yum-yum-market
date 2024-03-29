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
    try {
        if(!order){
            res.status(401);
            throw new Error;
        }
        res.status(200).send(order);
    } catch (error) {
        res.send('No orders here!');
    }
    
});

router.post('/pay', async (req: any, res) => {
    const { paymentId } = req.body;
    try {
        const order = await ordersService.payOrder(req.user.id, paymentId);
        res.send(order._id);
    } catch (error: any) {
        res.send(401).json(error.message);
    }
});

router.get('/track/:orderId', async (req, res) => {
    const order = await ordersService.getOrderById(req.params.orderId);
    res.send(order);
});

router.get('/paid-orders', async (req: any, res) => {
    const orders = await ordersService.getPaidOrders(req.user.id);
    res.send(orders);
})

export default router;