import React, { useState, useEffect } from "react";
import {
  FaLeaf,
  FaDrumstickBite,
  FaStar,
  FaRegStar,
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/userSlice";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);

  const isInCart = cartItems.some((i) => i.id === data._id);
  const cartItem = cartItems.find((i) => i.id === data._id);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-amber-400 text-sm" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 text-sm" />
        )
      );
    }
    return stars;
  };

  const handleIncrease = () => {
    if (quantity < 8) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      if (isInCart) {
        dispatch(updateQuantity({ id: data._id, quantity: newQty }));
      }
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (isInCart) {
        dispatch(updateQuantity({ id: data._id, quantity: newQty }));
      }
    }
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          shop: data.shop,
          quantity: quantity,
          foodType: data.foodType,
        })
      );
    }
  };

  return (
    <div className="group w-full max-w-[280px] rounded-2xl bg-white shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-[180px] bg-gray-50 overflow-hidden">
        {/* Food Type Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
          {data.foodType === "veg" ? (
            <>
              <FaLeaf className="text-green-600 text-xs" />
              <span className="text-xs font-semibold text-green-700">Veg</span>
            </>
          ) : (
            <>
              <FaDrumstickBite className="text-red-600 text-xs" />
              <span className="text-xs font-semibold text-red-700">
                Non-Veg
              </span>
            </>
          )}
        </div>

        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-4">
        <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-1">
          {data.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            ({data.rating?.count || 0})
          </span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            {/* <span className="text-xs text-gray-500">Price</span> */}
            <p className="font-bold text-gray-900 text-xl">₹{data.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <button
                className="px-2.5 py-1.5 hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={handleDecrease}
                disabled={!isInCart && quantity <= 1}
              >
                <FaMinus className="text-gray-700" size={11} />
              </button>
              <span className="px-3 py-1 text-sm font-semibold text-gray-800 min-w-[30px] text-center">
                {quantity}
              </span>
              <button
                disabled={!isInCart && quantity >= 8}
                className="px-2.5 py-1.5 hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={handleIncrease}
              >
                <FaPlus className="text-gray-700" size={11} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`px-3.5 py-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                isInCart
                  ? "bg-gray-800 cursor-not-allowed opacity-70"
                  : "bg-orange-500 hover:bg-orange-600 hover:shadow-md"
              } text-white`}
            >
              <FaShoppingCart size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
