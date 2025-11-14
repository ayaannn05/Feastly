import axios from "axios";
import { MdPhone } from "react-icons/md";
import { serverUrl } from "../App";
import { updateOrderStatus } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function OwnerOrderCard({ data }) {
  const [availableBoys, setAvailableBoys] = useState([]);
  const dispatch = useDispatch();
  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );
      dispatch(updateOrderStatus({ orderId, shopId, status }));
      setAvailableBoys(result.data.availableBoys);
      console.log(result.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {data.user.fullName}
        </h2>
        <p className="text-sm text-gray-500">{data.user.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <MdPhone />
          <span>{data.user.mobile}</span>
        </p>
        {data.paymentMethod === "online" ? (
          <p className="gap-2 text-sm text-gray-600">
            Payment: {data.payment ? "Paid" : "Pending"}
          </p>
        ) : (
          <p className="gap-2 text-sm text-gray-600">
            Payment Method: {data.paymentMethod}
          </p>
        )}
      </div>

      <div className="flex items-start flex-col gap-2 text-gray-600 text-sm">
        <p>{data?.deliveryAddress?.address}</p>
        <p className="text-xs text-gray-500">
          Lat: {data?.deliveryAddress?.latitude}, Lon:{" "}
          {data?.deliveryAddress?.longitude}
        </p>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {data.shopOrder[0].shopOrderItems.map((item, index) => (
          <div
            key={index}
            className="shrink-0 w-40 border rounded-lg p-2 bg-white"
          >
            <img
              src={item.item.image}
              alt={item.name}
              className="w-full h-24 object-cover rounded"
            />
            <p className="text-sm font-semibold mt-1">{item.name}</p>
            <p className="text-xs text-gray-500">
              Qty: {item.quantity} x ₹{item.price}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
        <span className="text-sm">
          Status:{" "}
          <span className="font-semibold capitalize text-[#ff4d2d]">
            {data.shopOrder[0].status}
          </span>
        </span>

        <select
          className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d]"
          onChange={(e) =>
            handleUpdateStatus(
              data._id,
              data.shopOrder[0].shop._id,
              e.target.value
            )
          }
        >
          <option>Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out Of Delivery</option>
        </select>
      </div>

      {data.shopOrder[0].status === "out of delivery" && (
        <div className="mt-3 p-3 border rounded-lg bg-orange-50 text-sm ">
          {data.shopOrder[0].assignedDeliveryBoy ? (
            <h3 className="text-md font-semibold mb-2 text-gray-800">
              {" "}
              Assigned Delivery Boy:
            </h3>
          ) : (
            <h3 className="text-md font-semibold mb-2 text-gray-800">
              Available Delivery Boys :
            </h3>
          )}
          {availableBoys.length > 0 ? (
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {availableBoys.map((boy) => (
                <li key={boy.id}>
                  {boy.fullName} - {boy.mobile}
                </li>
              ))}
            </ul>
          ) : data.shopOrder[0].assignedDeliveryBoy ? (
            <p className="text-gray-600">
              {data.shopOrder[0].assignedDeliveryBoy.fullName} -{" "}
              {data.shopOrder[0].assignedDeliveryBoy.mobile}
            </p>
          ) : (
            <p className="text-gray-600">Waiting for delivery boy to accept</p>
          )}
        </div>
      )}

      <div className="text-right font-bold text-gray-800 text-sm">
        Total: ₹{data.shopOrder[0].subTotal}
      </div>
    </div>
  );
}

export default OwnerOrderCard;
