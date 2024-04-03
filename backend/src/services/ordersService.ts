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

const deleteOrder = (orderId: string) => Order.findByIdAndDelete(orderId);

const markAsPaidOrder = (orderId: string) => Order.findByIdAndUpdate(orderId, { status: OrderStatus.PAID });

const markAsCancelledOrder = (orderId: string) => Order.findByIdAndUpdate(orderId, { status: OrderStatus.CANCELLED });

const markAsShippedOrder = (orderId: string) => Order.findByIdAndUpdate(orderId, { status: OrderStatus.SHIPPED });

const markAsReturnedOrder = (orderId: string) => Order.findByIdAndUpdate(orderId, { status: OrderStatus.RETURNED });

const search = (search: string) => {
    const orders = Order.find({ $where: `this._id.toString().includes('${search}')` });
    return orders;
};

const getAll = () => Order.find();

export default {
    createNewOrder,
    // deleteExistingOrders,
    payOrder,
    getOrderById,
    markAsPaidOrder,
    markAsCancelledOrder,
    markAsShippedOrder,
    markAsReturnedOrder,
    deleteOrder,
    search,
    getAll
}