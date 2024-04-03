import express from 'express';
import isAuth from '../middlewares/isAuth';
import ordersService from '../services/ordersService';
import { foodOrdersItem } from '../models/Order';

const router = express.Router();

router.use(isAuth);

router.post('/create', async (req: any, res) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
        res.status(401).send('Cart Is Empty!');
        return;
    };

    try {
        // await ordersService.deleteExistingOrders(req.user.id);
        const newOrder = await ordersService.createNewOrder({...requestOrder, user: req.user.id});
        res.send(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurs with payment');
    }
});

router.post('/pay', async (req: any, res) => {
    const { paymentId, items, id } = req.body;
    const foodOrdersCount: { [key: string]: number } = {};

    items.forEach((item: foodOrdersItem) => {
        const foodId = item.food.id;
        foodOrdersCount[foodId] = (foodOrdersCount[foodId] || 0) + item.quantity; 
    });
    
    try {
        const order = await ordersService.payOrder(id, paymentId, foodOrdersCount);
        res.send(order._id);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

router.get('/track/:orderId', async (req, res) => {
    const order = await ordersService.getOrderById(req.params.orderId);
    res.send(order);
});

router.delete('/delete-order/:orderId', async (req, res) => {
    await ordersService.deleteOrder(req.params.orderId);
    res.status(200).json('Order was DELETED successfully');
});

router.patch('/cancel-order', async (req, res) => {
    await ordersService.markAsCancelledOrder(req.body.orderId);
    res.status(200).json('Order was CANCELLED successfully');
});

router.patch('/shipped-order', async (req, res) => {
    await ordersService.markAsShippedOrder(req.body.orderId);
    res.status(200).json('Order was SHIPPED successfully');
});

router.patch('/return-order', async (req, res) => {
    await ordersService.markAsReturnedOrder(req.body.orderId);
    res.status(200).json('Order was RETURNED successfully');
});

router.patch('/pay-order-as-admin', async (req, res) => {
    await ordersService.markAsPaidOrder(req.body.orderId);
    res.status(200).json('Order was PAID successfully');
});

router.get('/search/:searchText', async (req, res) => {
    const searchText = req.params.searchText;
    const orders = await ordersService.search(searchText);    
    res.send(orders);
});

router.get('/all', async (req, res) => {
    const orders = await ordersService.getAll(); 
    res.send(orders);
})

export default router;