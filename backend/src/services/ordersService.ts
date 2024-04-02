import { OrderStatus } from "../constants/order_status";
import { Food } from "../models/Food";
import { Order } from "../models/Order";

const createNewOrder = async (orderData: any) => {
    try {
        const newOrder = await Order.create(orderData);
        return newOrder;
    } catch (error) {
        throw new Error("Error creating new order");
    }
};

// const deleteExistingOrders = async (userId: string) => {
//     try {
//         await Order.deleteMany({ user: userId, status: OrderStatus.NEW });
//     } catch (error) {
//         throw new Error("Error deleting existing orders");
//     }
// };

const getOrderById = (orderId: string) => Order.findById(orderId);


const payOrder = async (orderId: string, paymentId: string,  foodOrdersCount: { [key: string]: number }) => {
    const order = await getOrderById(orderId);
    if(!order){
        throw new Error('Order Not Found!');
    };
    
    for (const foodId in foodOrdersCount) {
        if (Object.prototype.hasOwnProperty.call(foodOrdersCount, foodId)) {
            const quantity = foodOrdersCount[foodId];    
            const food = await Food.findById(foodId);
            if (!food) {
                throw new Error(`Food with ID ${foodId} not found!`);
            }
            food.ordersCount += quantity; 
            await food.save();
        }
    }
    
    order.paymentId = paymentId;
    order.status = OrderStatus.PAID;
    return await order.save();
}

const getNewOrdersByUser = (userId: string) => Order.find({user: userId, status: OrderStatus.NEW}).sort({ createdAt: -1});

const getPaidOrdersByUser = (userId: string) => Order.find({user: userId, status: OrderStatus.PAID}).sort({ createdAt: -1});

const getCancelledOrdersByUser = (userId: string) => Order.find({user: userId, status: OrderStatus.CANCELLED}).sort({ createdAt: -1});

const getShippedOrdersByUser = (userId: string) => Order.find({user: userId, status: OrderStatus.SHIPPED}).sort({ createdAt: -1});

const getReturnedOrdersByUser = (userId: string) => Order.find({user: userId, status: OrderStatus.RETURNED}).sort({ createdAt: -1});

const markAsCancelledOrder = (orderId: string) => Order.findByIdAndUpdate(orderId, { status: OrderStatus.CANCELLED });

const markAsShippedOrder = (orderId: string) => Order.findByIdAndUpdate(orderId, { status: OrderStatus.SHIPPED });

const markAsReturnedOrder = (orderId: string) => Order.findByIdAndUpdate(orderId, { status: OrderStatus.RETURNED });


export default {
    createNewOrder,
    // deleteExistingOrders,
    getNewOrdersByUser,
    payOrder,
    getOrderById,
    getPaidOrdersByUser,
    markAsCancelledOrder,
    markAsShippedOrder,
    markAsReturnedOrder,
    getCancelledOrdersByUser,
    getShippedOrdersByUser,
    getReturnedOrdersByUser
}