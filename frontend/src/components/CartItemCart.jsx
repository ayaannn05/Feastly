import { FaMinus, FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/userSlice";
import { useState } from "react";

function CartItemCart({ data }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
      setError("");
    } else {
      const msg = "Minimum quantity should be 1.";
      setError(msg);
      alert(msg); 
    }
  };
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id, currentQty) => {
    if (currentQty < 8) {
      dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
      setError("");
    } else {
      const msg = "You can order a maximum of 8 quantities only.";
      setError(msg);
      alert(msg); 
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-xl shadow border ">
      <div className=" flex items-center gap-4 ">
        <img
          src={data.image}
          alt={data.name}
          className="w-20 h-20 object-cover rounded-lg  border "
        />
        <div>
          <h1 className="font-bold text-gray-800"> {data.name} </h1>
          <p className="text-sm text-gray-500 ">
            ₹ {data.price} x {data.quantity}
          </p>
          <p className="font-bold text-gray-900 ">
            ₹ {data.price * data.quantity}{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <button
          className=" cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          onClick={() => {
            handleDecrease(data.id, data.quantity);
          }}
        >
          <FaMinus size={12} />
        </button>
        <span>{data.quantity}</span>
        <button
          className=" cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          onClick={() => {
            handleIncrease(data.id, data.quantity);
          }}
        >
          <FaPlus size={12} />
        </button>
        <button
          onClick={() => {
            handleDelete(data.id);
          }}
          className=" cursor-pointer p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 "
        >
          <CiTrash size={16} className="text-red-600" />
        </button>
      </div>
    </div>
  );
}

export default CartItemCart;
