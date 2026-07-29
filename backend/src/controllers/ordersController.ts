import express from "express";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import ordersService from "../services/ordersService";

const router = express.Router();

router.use(isAuth);

const isOwnerOrAdmin = (order: any, user: any) =>
  user?.isAdmin || order?.user?.toString() === user?.id;

export const getOrderPaymentErrorStatus = (error: Error) => {
  if (error.message === "Order Not Found!") {
    return 404;
  }

  if (error.message === "Order is already paid!") {
    return 400;
  }

  return 400;
};

router.post("/create", async (req: any, res) => {
  const requestOrder = req.body;

  if (!Array.isArray(requestOrder.items) || requestOrder.items.length <= 0) {
    res.status(401).send("Cart Is Empty!");
    return;
  }

  try {
    const newOrder = await ordersService.createNewOrder({
      ...requestOrder,
      user: req.user.id,
    });
    res.send(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurs with payment");
  }
});

router.post("/pay", async (req: any, res) => {
  const { paymentId, id } = req.body;

  try {
    const order = await ordersService.getOrderById(id);
    if (!order || !isOwnerOrAdmin(order, req.user)) {
      res.status(403).json({ error: "Not allowed to pay for this order" });
      return;
    }

    const paidOrder = await ordersService.payOrder(id, paymentId);
    res.send(paidOrder._id);
  } catch (error: any) {
    const status = getOrderPaymentErrorStatus(error as Error);
    res.status(status).json({ error: error.message });
  }
});

router.get("/track/:orderId", async (req: any, res) => {
  const order = await ordersService.getOrderById(req.params.orderId);
  if (!order || !isOwnerOrAdmin(order, req.user)) {
    res.status(403).send();
    return;
  }
  res.send(order);
});

router.delete("/delete-order/:orderId", isAdmin, async (req, res) => {
  await ordersService.deleteOrder(req.params.orderId);
  res.status(200).json("Order was DELETED successfully");
});

router.patch("/cancel-order", async (req: any, res) => {
  const order = await ordersService.getOrderById(req.body.orderId);
  if (!order || !isOwnerOrAdmin(order, req.user)) {
    res.status(403).send();
    return;
  }
  await ordersService.markAsCancelledOrder(req.body.orderId);
  res.status(200).json("Order was CANCELLED successfully");
});

router.patch("/shipped-order", isAdmin, async (req, res) => {
  await ordersService.markAsShippedOrder(req.body.orderId);
  res.status(200).json("Order was SHIPPED successfully");
});

router.patch("/return-order", isAdmin, async (req, res) => {
  await ordersService.markAsReturnedOrder(req.body.orderId);
  res.status(200).json("Order was RETURNED successfully");
});

router.patch("/pay-order-as-admin", isAdmin, async (req, res) => {
  await ordersService.markAsPaidOrder(req.body.orderId);
  res.status(200).json("Order was PAID successfully");
});

router.get("/search/:searchText", async (req: any, res) => {
  const searchText = req.params.searchText;
  const orders = await ordersService.search(searchText, req.user);
  res.send(orders);
});

router.get("/all", async (req: any, res) => {
  const orders = await ordersService.getAll(req.user);
  res.send(orders);
});

export default router;
