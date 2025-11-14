import { useSelector } from "react-redux";
import Nav from "./Nav";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";

function DeliveryBoy() {
  const { userData } = useSelector((state) => state.user);
  const [availableAssignments, setAvailableAssignments] = useState(null);

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, {
        withCredentials: true,
      });
      console.log(result.data);
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
      // Optionally refresh assignments after accepting an order
      getAssignments();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  useEffect(() => {
    getAssignments();
  }, [userData]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center overflow-y-auto bg-[#fff9f]">
      <Nav />
      <div className="w-full max-w-[800px] flex flex-col gap-5 items-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col text-center gap-3 justify-start items-center w-full hover:shadow-md transition-shadow duration-300">
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
      </div>
    </div>
  );
}

export default DeliveryBoy;
