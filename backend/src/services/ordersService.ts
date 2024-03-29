import { OrderStatus } from "../constants/order_status";
import { Order } from "../models/Order";

const createNewOrder = async (orderData: any) => {
    try {
        const newOrder = await Order.create(orderData);
        return newOrder;
    } catch (error) {
        throw new Error("Error creating new order");
    }
};

const deleteExistingOrders = async (userId: string) => {
    try {
        await Order.deleteMany({ user: userId, status: OrderStatus.NEW });
    } catch (error) {
        throw new Error("Error deleting existing orders");
    }
};

const getOrderById = (orderId: string) => Order.findById(orderId);

const getOrderByUser = (userId: string) => Order.findOne({user: userId, status: OrderStatus.NEW});

const payOrder = async (userId: string, paymentId: string) => {
    const order = await getOrderByUser(userId);
    if(!order){
        throw new Error('Order Not Found!');
    }
    
    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    return await order.save();
}

export default {
    createNewOrder,
    deleteExistingOrders,
    getOrderByUser,
    payOrder,
    getOrderById
}