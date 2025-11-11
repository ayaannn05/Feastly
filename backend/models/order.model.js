import mongoose from "mongoose";

const shopOrderItemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const shopOrderSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subTotal: { type: Number },

    shopOrderItems: [shopOrderItemSchema],
    status: {
      type: String,
      enum: ["pending", "preparing", "on the way", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },
    deliveryAddress: {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    totalAmount: { type: Number, required: true },
    shopOrder: [shopOrderSchema],
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
