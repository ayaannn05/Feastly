import express from "express";
import isAuth from "../middleware/isAuth.js";

import { placeOrder, getMyOrders } from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/place-order", isAuth, placeOrder);
OrderRouter.get("/my-orders", isAuth, getMyOrders);

export default OrderRouter;
