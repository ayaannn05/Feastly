import { useSelector } from "react-redux";
import Nav from "./Nav";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import DeliveryBoyTracking from "./DeliveryBoyTracking";

function DeliveryBoy() {
  const { userData } = useSelector((state) => state.user);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const [currentOrder, setCurrentOrder] = useState();


  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, {
        withCredentials: true,
      });
      // console.log(result.data);
      setAvailableAssignments(result.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      setCurrentOrder(result.data);
      getAssignments();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-current-orders`,
        {
          withCredentials: true,
        }
      );
      // console.log(result.data);
      setCurrentOrder(result.data);
    } catch (error) {
      console.error("Error fetching current orders:", error);
    }
  };

const handleCompleteOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/complete-order/${currentOrder.assignmentId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(result.data);
      setCurrentOrder(null);
      getAssignments();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  }

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
  }, [userData]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center overflow-y-auto bg-[#fff9f6] pb-8">
      <Nav />
      <div className="w-full max-w-[800px] flex flex-col gap-5 items-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col text-center gap-3 justify-start items-center w-full">
          <h1 className="text-2xl font-semibold text-orange-500">
            Welcome,{" "}
            {userData?.fullName.charAt(0).toUpperCase() +
              userData?.fullName.slice(1)}
          </h1>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Latitude: </span>
            {userData.location.coordinates[1]},
            <span className="font-medium"> Longitude: </span>
            {userData.location.coordinates[0]}
          </p>
        </div>

        {!currentOrder && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4 w-full">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Available Orders
            </h2>
            <div className="space-y-3">
              {availableAssignments && availableAssignments.length > 0 ? (
                availableAssignments.map((a, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-5 flex justify-between items-center hover:border-orange-300 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {a?.shopName}
                        </h3>
                      </div>
                      <div className="flex items-start gap-2 mb-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{a?.deliveryAddress.address}</span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-700 font-medium">
                          {a.item.length} items
                        </span>
                        <span className="text-orange-600 font-semibold">
                          ₹{a.totalAmount}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => acceptOrder(a.id)}
                      className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200"
                    >
                      <span>Accept</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500">
                    No available orders at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentOrder && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-5 w-full">
            {/* Header with Order ID */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Current Order
              </h2>
              <span className="text-sm font-mono font-semibold text-orange-600">
                #{currentOrder._id.slice(-6).toUpperCase()}
              </span>
            </div>

            {/* Shop Details */}
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {currentOrder.shopName}
                </h3>
                <p className="text-sm text-gray-600">Restaurant</p>
              </div>
            </div>

            {/* Order Items - Simple List */}
            <div className="pb-4 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Order Items
              </h4>
              <div className="space-y-2">
                {currentOrder.shopOrder.shopOrderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-orange-600 font-semibold w-6">
                        {item.quantity}x
                      </span>
                      <span className="text-gray-900">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-lg font-bold text-orange-600">
                  ₹{currentOrder.shopOrder.subTotal}
                </span>
              </div>
            </div>

            {/* Delivery Address & Customer Details Combined */}
            <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg p-5 border border-gray-200">
              {/* Delivery Address */}
              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    Delivery Address
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentOrder.deliveryAddress}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>
                      Lat: {currentOrder.customerLocation.lat.toFixed(6)}
                    </span>
                    <span>
                      Long: {currentOrder.customerLocation.lon.toFixed(6)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    Customer Details
                  </h4>
                  <p className="text-sm text-gray-700 font-medium">
                    {currentOrder.user.fullName}
                  </p>
                  <a
                    href={`tel:${currentOrder.user.mobile}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium mt-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {currentOrder.user.mobile}
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg h-94 flex items-center justify-center border border-gray-200">
              <DeliveryBoyTracking data={currentOrder} />
            </div>

            {/* OTP Verification */}
            <div className="mt-2">
            
                <button
                  onClick={handleCompleteOrder}
                  className="cursor-pointer w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap"
                >
                  Mark as Delivered
                </button>
             
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryBoy;
