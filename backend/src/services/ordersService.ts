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

export default {
    createNewOrder,
    deleteExistingOrders
}