import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";
import DeliveryAssignment from "../models/deliveryAssignment.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (
      !deliveryAddress ||
      !deliveryAddress.latitude ||
      !deliveryAddress.longitude
    ) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    const groupItemsByShop = {};

    cartItems.forEach((item) => {
      const shopId = item.shop?._id;

      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });

    const shopOrders = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");

        const items = groupItemsByShop[shopId];
        const subTotal = items.reduce(
          (sum, item) => sum + Number(item.price) * Number(item.quantity),
          0
        );
        return {
          shop: shop._id,
          owner: shop.owner._id,
          subTotal,
          shopOrderItems: items.map((item) => ({
            item: item.id,
            price: item.price,
            quantity: item.quantity,
            name: item.name,
          })),
        };
      })
    );

    const newOrder = await Order.create({
      user: req.userId,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrder: shopOrders,
    });

    await newOrder.populate(
      "shopOrder.shopOrderItems.item",
      "name image price"
    );
    await newOrder.populate("shopOrder.shop", "name");

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Place order error:", error);
    return res.status(500).json({ message: `Place order error ${error}` });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.role === "user") {
      const orders = await Order.find({ user: req.userId })
        .sort({ createdAt: -1 })
        .populate("shopOrder.shop", "name")
        .populate("shopOrder.owner", "name email mobile")
        .populate("shopOrder.shopOrderItems.item", "name image price");

      return res.status(200).json(orders);
    } else if (user.role === "owner") {
      const orders = await Order.find({ "shopOrder.owner": req.userId })
        .sort({ createdAt: -1 })
        .populate("shopOrder.shop", "name")
        .populate("user")
        .populate("shopOrder.shopOrderItems.item", "name image price");

      const filteredOrders = orders.map((order) => ({
        _id: order._id,
        user: order.user,
        createdAt: order.createdAt,
        paymentMethod: order.paymentMethod,
        deliveryAddress: order.deliveryAddress,
        shopOrder: order.shopOrder.filter(
          (so) => so.owner.toString() === req.userId
        ),
      }));

      return res.status(200).json(filteredOrders);
    }
  } catch (error) {
    return res.status(500).json({ message: `Get user orders error ${error}` });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const shopOrder = order.shopOrder.find(
      (so) => so.shop.toString() === shopId
    );
    if (!shopOrder) {
      return res.status(404).json({ message: "Shop order not found" });
    }

    shopOrder.status = status;

    let deilveryBoyPayload = [];

    if (status === "out of delivery" && !shopOrder.assignments) {
      const { longitude, latitude } = order.deliveryAddress;
      const nearByDeliveryBoys = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance: 5000,
          },
        },
      });

      const nearByIds = nearByDeliveryBoys.map((db) => db._id);
      const busyIds = await DeliveryAssignment.find({
        assignedTo: { $in: nearByIds },
        status: { $nin: ["broadcasted", "completed"] },
      }).distinct("assignedTo");

      const busyIdSet = new Set(busyIds.map((id) => id.toString()));

      const availableBoys = nearByDeliveryBoys.filter(
        (db) => !busyIdSet.has(db._id.toString())
      );
      const candidates = availableBoys.map((db) => db._id);

      if (candidates.length === 0) {
        await order.save();
        return res.json({ message: "No delivery boys available nearby" });
      }

      const deliveryAssignment = await DeliveryAssignment.create({
        order: order._id,
        shop: shopOrder.shop,
        shopOrderId: shopOrder._id,
        broadcastedTo: candidates,
        status: "boradcasted",
      });
      shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo;
      shopOrder.assignments = deliveryAssignment._id;
      deilveryBoyPayload = availableBoys.map((db) => ({
        id: db._id,
        fullName: db.fullName,
        longitude: db.location.coordinates?.[0],
        latitude: db.location.coordinates?.[1],
        mobile: db.mobile,
      }));
    }

    await order.save();
    const updatedShopOrder = order.shopOrder.find(
      (so) => so.shop._id.toString() === shopId
    );
    await order.populate("shopOrder.shop", "name");
    await order.populate(
      "shopOrder.assignedDeliveryBoy",
      "fullName email mobile"
    );

    return res.status(200).json({
      message: "Order status updated successfully",
      shopOrder: updatedShopOrder,
      assignedDeliveryBoys: updatedShopOrder?.assignedDeliveryBoy,
      availableBoys: deilveryBoyPayload,
      assignment: updatedShopOrder?.assignments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Update order status error ${error}` });
  }
};

export const getDeliveryBoysAssignment = async (req, res) => {
  try {
    const deliveryBoyId = req.userId;
    const assignments = await DeliveryAssignment.find({
      broadcastedTo: deliveryBoyId,
      status: "boradcasted",
    })
      .populate("order")
      .populate("shop", "name")
      .populate("shopOrderId");

    const formatted = assignments.map((assignment) => ({
      id: assignment._id,
      orderId: assignment.order._id,
      shopName: assignment.shop.name,
      deliveryAddress: assignment.order.deliveryAddress,
      item:
        assignment.order.shopOrder.find(
          (so) => so._id.toString() === assignment.shopOrderId._id.toString()
        )?.shopOrderItems || [],

      totalAmount: assignment.order.totalAmount,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get delivery boys assignment error ${error}` });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await DeliveryAssignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.status !== "boradcasted") {
      return res.status(400).json({ message: "Assignment is expired!" });
    }

    const alreadyAssigned = await DeliveryAssignment.findOne({
      assignedTo: req.userId,
      status: { $nin: ["broadcasted", "completed"] },
    });

    if (alreadyAssigned) {
      return res
        .status(400)
        .json({ message: "You have already an active assignment!" });
    }

    assignment.assignedTo = req.userId;
    assignment.status = "assigned";
    assignment.acceptedAt = new Date();
    await assignment.save();

    const order = await Order.findById(assignment.order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const shopOrder = order.shopOrder.find(
      (so) => so._id.toString() === assignment.shopOrderId.toString()
    );

    if (!shopOrder) {
      return res.status(404).json({ message: "Shop order not found" });
    }

    shopOrder.assignedDeliveryBoy = req.userId;
    await order.save();
    res.status(200).json({ message: "Order accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Accept order error ${error}` });
  }
};
