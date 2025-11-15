import { FaLocationDot, FaPlus, FaBowlFood } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { TbReceipt2 } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { HiLogout } from "react-icons/hi";
import { PiBowlFoodFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { userData, currentCity, cartItems } = useSelector(
    (state) => state.user
  );
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="w-full h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 fixed top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-orange-100 shadow-sm">
        {/* Logo with Creative Icon */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative">
            {/* Animated Bowl Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <PiBowlFoodFill className="text-white w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            {/* Floating Decoration Dots */}
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:to-red-600 transition-all">
              Feastly
            </h1>
            <p className="text-[10px] font-medium text-orange-500 -mt-1 tracking-wider">
              FOOD DELIVERY
            </p>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {showSearch && userData.role === "user" && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white shadow-2xl rounded-2xl p-4 border border-orange-100 animate-slideDown">
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
              <IoIosSearch className="text-orange-500 w-5 h-5 flex-shrink-0" />
              <input
                className="flex-1 text-sm text-gray-900 placeholder-gray-400 bg-transparent outline-none"
                type="text"
                placeholder="Search delicious food..."
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Desktop Search Bar - User Only */}
        {userData.role === "user" && (
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl mx-8">
            {/* Location with Pulse Animation */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 min-w-[160px] hover:border-orange-300 hover:shadow-md transition-all group">
              <div className="relative">
                <FaLocationDot className="text-orange-500 w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <span className="text-sm text-gray-700 font-semibold truncate">
                {currentCity}
              </span>
            </div>

            {/* Search with Enhanced Focus */}
            <div className="flex-1 flex items-center gap-3 px-5 py-2.5 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-orange-300 focus-within:border-orange-500 focus-within:bg-white focus-within:shadow-lg transition-all duration-300">
              <IoIosSearch className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input
                className="flex-1 text-sm text-gray-900 placeholder-gray-500 bg-transparent outline-none font-medium"
                type="text"
                placeholder="Search for restaurants, cuisines, dishes..."
              />
            </div>
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle - User Only */}
          {userData.role === "user" && (
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-orange-50 transition-all duration-200 active:scale-95"
            >
              {showSearch ? (
                <RxCross2 className="text-gray-700 w-5 h-5" />
              ) : (
                <IoIosSearch className="text-orange-500 w-5 h-5" />
              )}
            </button>
          )}

          {/* Owner Actions */}
          {userData.role === "owner" && myShopData && (
            <>
              <button
                onClick={() => navigate("/add-item")}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
              <button
                onClick={() => navigate("/add-item")}
                className="sm:hidden w-10 h-10 flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <FaPlus className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Cart with Bounce Animation - User Only */}
          {userData.role === "user" && (
            <button
              onClick={() => navigate("/cart")}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-orange-50 transition-all duration-200 active:scale-95 group"
            >
              <FiShoppingCart className="text-gray-700 group-hover:text-orange-500 w-5 h-5 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>
          )}

          {/* Orders Button - Hide for delivery boy */}
          {userData.role !== "deliveryBoy" && (
            <>
              <button
                onClick={() => navigate("/my-orders")}
                className="relative hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-orange-50 hover:to-red-50 text-gray-700 hover:text-orange-600 rounded-xl font-semibold text-sm transition-all duration-300 border border-gray-200 hover:border-orange-200 hover:shadow-md"
              >
                <TbReceipt2 className="w-4 h-4" />
                <span>{userData.role === "owner" ? "Orders" : "Orders"}</span>
              </button>

              {/* Mobile Orders Icon */}
              <button
                onClick={() => navigate("/my-orders")}
                className="sm:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-orange-50 transition-all duration-200 active:scale-95"
              >
                <TbReceipt2 className="text-gray-700 w-5 h-5" />
              </button>
            </>
          )}

          {/* Profile Avatar with Glow */}
          <div className="relative">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="relative w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden group"
            >
              <span className="relative z-10">
                {userData?.fullName.charAt(0).toUpperCase()}
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Dropdown Menu with Animation */}
            {showInfo && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
                  onClick={() => setShowInfo(false)}
                />

                {/* Menu */}
                <div className="absolute top-full right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slideDown">
                  <div className="px-4 py-4 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                        {userData?.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {userData?.fullName}
                        </p>
                        <p className="text-xs text-orange-600 font-semibold capitalize">
                          {userData?.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {userData.role === "user" && (
                    <button
                      onClick={() => {
                        navigate("/my-orders");
                        setShowInfo(false);
                      }}
                      className="sm:hidden w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-orange-50 transition-all flex items-center gap-3 group"
                    >
                      <TbReceipt2 className="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
                      <span>My Orders</span>
                    </button>
                  )}

                  <button
                    onClick={handleLogOut}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-all flex items-center gap-3 group"
                  >
                    <HiLogout className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Log out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
