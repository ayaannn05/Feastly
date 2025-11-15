import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  placeOrder,
  getMyOrders,
  updateOrderStatus,
  getDeliveryBoysAssignment,
  acceptOrder,
  getcurrentOrder,
  getOrderById,
} from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/place-order", isAuth, placeOrder);
OrderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus);
OrderRouter.get("/my-orders", isAuth, getMyOrders);
OrderRouter.get("/get-assignments", isAuth, getDeliveryBoysAssignment);
OrderRouter.get("/accept-order/:assignmentId", isAuth, acceptOrder);
OrderRouter.get("/get-current-orders", isAuth, getcurrentOrder);
OrderRouter.get("/get-order/:orderId", isAuth, getOrderById);

export default OrderRouter;
