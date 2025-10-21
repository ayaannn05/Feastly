import mongoose from "mongoose";

const shopOrderItemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
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
  },
  { timestamps: true }
);

const orderSchema = new mongoone.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentMehthod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
      latitude: Number,
      longitude: Number,
    },
    totalAmount: { type: Number, required: true },
    shopOrder: [],
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
