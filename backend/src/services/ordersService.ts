import { OrderStatus } from "../constants/order_status";
import { Food } from "../models/Food";
import { Order } from "../models/Order";
import { escapeRegex } from "../utils/regex";

const createNewOrder = async (orderData: any) => {
    try {
        const items = [];
        let totalPrice = 0;

        for (const requestedItem of orderData.items) {
            const foodId = requestedItem?.food?.id || requestedItem?.food?._id;
            const quantity = Number(requestedItem?.quantity);

            if (!foodId || !Number.isInteger(quantity) || quantity <= 0) {
                throw new Error('Invalid order item');
            }

            const food = await Food.findById(foodId);
            if (!food) {
                throw new Error(`Food with ID ${foodId} not found!`);
            }

            const lineTotal = food.price * quantity;
            totalPrice += lineTotal;

            items.push({
                food,
                quantity,
                price: lineTotal
            });
        }

        const newOrder = await Order.create({
            name: orderData.name,
            address: orderData.address,
            addressLatLng: orderData.addressLatLng,
            user: orderData.user,
            items,
            totalPrice
        });
        return newOrder;
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error creating new order");
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


const payOrder = async (orderId: string, paymentId: string) => {
    const order = await getOrderById(orderId);
    if(!order){
        throw new Error('Order Not Found!');
    };

    if (order.status === OrderStatus.PAID) {
        throw new Error('Order is already paid!');
    }

    for (const item of order.items) {
        const food = await Food.findById(item.food.id);
        if (!food) {
            throw new Error(`Food with ID ${item.food.id} not found!`);
        }
        food.ordersCount += item.quantity;
        await food.save();
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
    const orders = Order.aggregate([
        {
            $match: {
                $expr: {
                    $regexMatch: {
                        input: { $toString: '$_id' },
                        regex: escapeRegex(search),
                        options: 'i'
                    }
                }
            }
        }
    ]);
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