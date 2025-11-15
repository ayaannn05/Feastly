import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { IoArrowBack } from "react-icons/io5";
import {
  MdRestaurant,
  MdDeliveryDining,
  MdLocationOn,
  MdPhone,
  MdCheckCircle,
} from "react-icons/md";
import { FaBox } from "react-icons/fa";
import DeliveryBoyTracking from "../components/DeliveryBoyTracking";
import { useSelector } from "react-redux";

function TrackOrder() {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState(null);
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.user);
  const [liveLocations, setLiveLocations] = useState({});

  const handleGetOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-order/${orderId}`,
        {
          withCredentials: true,
        }
      );
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket?.on(
      "updateDeliveryLocation",
      ({ deliveryBoyId, latitude, longitude }) => {
        setLiveLocations((prev) => ({
          ...prev,
          [deliveryBoyId]: { lat: latitude, lon: longitude },
        }));
      }
    );
  }, [socket]);

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      preparing: "bg-blue-100 text-blue-700 border-blue-300",
      "out of delivery": "bg-orange-100 text-orange-700 border-orange-300",
      delivered: "bg-green-100 text-green-700 border-green-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <IoArrowBack className="text-gray-700 w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Track Your Order
              </h1>
              <p className="text-xs text-gray-500">
                Order #{orderId?.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Delivery Address Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MdLocationOn className="text-orange-600 w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Delivery Address
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentOrder?.deliveryAddress?.address}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        {currentOrder?.shopOrder?.map((shopOrder, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Restaurant Header */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 px-5 py-4 border-b border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <MdRestaurant className="text-orange-600 w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {shopOrder.shop.name}
                    </h2>
                    <p className="text-xs text-gray-600">
                      {shopOrder.shopOrderItems?.length} item
                      {shopOrder.shopOrderItems?.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase ${getStatusColor(
                    shopOrder.status
                  )}`}
                >
                  {shopOrder.status}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaBox className="text-gray-400 w-4 h-4" />
                Order Items
              </h3>
              <div className="space-y-2">
                {shopOrder.shopOrderItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-900">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{shopOrder.subTotal}
                </span>
              </div>
            </div>

            {/* Delivery Status */}
            {shopOrder.status !== "delivered" ? (
              <div className="p-5 space-y-4">
                {shopOrder.assignedDeliveryBoy ? (
                  <>
                    {/* Delivery Partner Info */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <MdDeliveryDining className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-600 font-semibold uppercase">
                            Delivery Partner
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {shopOrder.assignedDeliveryBoy.fullName}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`tel:${shopOrder.assignedDeliveryBoy.mobile}`}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-blue-300 text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors"
                      >
                        <MdPhone className="w-4 h-4" />
                        {shopOrder.assignedDeliveryBoy.mobile}
                      </a>
                    </div>

                    {/* Live Map */}
                    <div className="h-94 rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                      <div className="h-94 w-full">
                        <DeliveryBoyTracking
                          data={{
                            deliveryBoyLocation: liveLocations[
                              shopOrder.assignedDeliveryBoy._id
                            ] || {
                              lat: shopOrder.assignedDeliveryBoy.location
                                .coordinates[1],
                              lon: shopOrder.assignedDeliveryBoy.location
                                .coordinates[0],
                            },
                            customerLocation: {
                              lat: currentOrder.deliveryAddress.latitude,
                              lon: currentOrder.deliveryAddress.longitude,
                            },
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MdDeliveryDining className="text-yellow-600 w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Searching for delivery partner
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        We'll notify you once assigned
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MdCheckCircle className="text-green-600 w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-green-700">
                      Order Delivered!
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Thank you for ordering with us
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackOrder;
