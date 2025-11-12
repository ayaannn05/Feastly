import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  placeOrder,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/place-order", isAuth, placeOrder);
OrderRouter.get("/my-orders", isAuth, getMyOrders);
OrderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus);

export default OrderRouter;
