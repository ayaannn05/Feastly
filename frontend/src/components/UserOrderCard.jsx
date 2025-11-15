import { useNavigate } from "react-router-dom";
import { IoReceipt, IoCalendarOutline, IoCardOutline } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";

function UserOrderCard({ data }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      preparing: "bg-blue-100 text-blue-700 border-blue-200",
      "out of delivery": "bg-green-100 text-green-700 border-green-200",
      delivered: "bg-gray-100 text-gray-700 border-gray-200"
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  // Check if there's no order data
  if (!data || !data.shopOrder || data.shopOrder.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <IoReceipt className="text-gray-400 w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">No Orders Yet</h3>
            <p className="text-gray-500 text-sm">You haven't placed any orders yet.</p>
            <p className="text-gray-500 text-sm">Start shopping to see your orders here!</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <IoReceipt className="text-orange-600 w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">
              Order #{data._id.slice(-6).toUpperCase()}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-0.5">
              <IoCalendarOutline className="w-3.5 h-3.5" />
              <span>{formatDate(data.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-lg border text-xs font-semibold uppercase ${getStatusColor(data.shopOrder?.[0].status)}`}>
          {data.shopOrder?.[0].status}
        </span>
      </div>

      {/* Shop Orders */}
      <div className="p-5 space-y-4">
        {data.shopOrder.map((shopOrder, index) => (
          <div key={index} className="space-y-3">
            <h4 className="font-bold text-gray-800 text-sm">{shopOrder.shop.name}</h4>

            {/* Items Grid - Compact */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {shopOrder.shopOrderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-28 bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={item.item.image}
                    alt={item.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-xs font-semibold text-gray-800 truncate mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item.quantity}× ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="font-bold text-gray-900">₹{shopOrder.subTotal}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IoCardOutline className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500 uppercase">
              {data.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
            </p>
            {data.paymentMethod !== "cod" && (
              <p className="text-xs font-semibold text-gray-700">
                {data.payment ? "Paid" : "Pending"}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-bold text-gray-900 text-lg">₹{data.totalAmount}</p>
          </div>

          <button
            onClick={() => navigate(`/track-order/${data._id}`)}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <MdDeliveryDining className="w-4 h-4" />
            <span>Track</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserOrderCard;
