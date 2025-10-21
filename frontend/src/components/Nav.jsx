import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { TbReceipt2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { userData, currentCity, cartItems } = useSelector((state) => state.user);
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
      console.log(res);
      dispatch(setUserData(null));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible ">
      {showSearch && userData.role == "user" && (
        <div className="md:hidden  w-[60%] h-[60px] bg-white shadow-xl rounded-lg items-center flex fixed top-[80px] left-[20%] gap-[20px] ">
          {/* Searchbar */}
          <div className="m-3  w-[80%]  flex items-center gap-[10px] ">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              className="px-[10px] text-gray-700 outline-0 w-full "
              type="text"
              placeholder="Search Food..."
            />
          </div>
        </div>
      )}

      {/*Logo */}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]"> Feastly</h1>
      {/* bar */}
      {userData.role == "user" && (
        <div className="  md:w-[60%] lg:w-[40%] h-[60px] bg-white shadow-xl rounded-lg items-center hidden md:flex gap-[20px] ">
          {/* Loaction */}
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400 ">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />{" "}
            <div className="w-[80%] truncate text-gray-600 ">{currentCity}</div>
          </div>
          {/* Searchbar */}
          <div className="w-[80%]  flex items-center gap-[10px] ">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              className="px-[10px] text-gray-700 outline-0 w-full "
              type="text"
              placeholder="Search Delicious Food..."
            />
          </div>
        </div>
      )}

      <div className=" flex items-center gap-6">
        {/* Cart */}
        {userData.role == "user" &&
          (showSearch ? (
            <RxCross2
              onClick={() => setShowSearch(false)}
              className="text-[#ff4d2d] md:hidden cursor-pointer "
            />
          ) : (
            <IoIosSearch
              size={25}
              className="text-[#ff4d2d] md:hidden cursor-pointer "
              onClick={() => setShowSearch(true)}
            />
          ))}

        {userData.role == "owner" ? (
          <>
            {myShopData && (
              <>
                <button
                  onClick={() => navigate("/add-item")}
                  className="hidden md:flex  items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] "
                >
                  <FaPlus size={20} /> <span>Add Food Item</span>
                </button>
                <button
                  onClick={() => navigate("/add-item")}
                  className="md:hidden flex  items-center  p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] "
                >
                  <FaPlus size={20} />
                </button>
              </>
            )}

            <div className=" hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium ">
              <TbReceipt2 size={20} />
              <span>My Orders</span>
              <span className="absolute -right-3 -top-2 flex items-center justify-center w-6 h-6 rounded-full bg-[#ff4d2d] text-[#fff] text-xs font-bold">
                0
              </span>
            </div>
            <div className=" md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium ">
              <TbReceipt2 size={20} />

              <span className="absolute -right-3 -top-3 flex items-center justify-center w-6 h-6 rounded-full bg-[#ff4d2d] text-[#fff] text-xs font-bold">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div onClick={()=>navigate("/cart")} className="relative cursor-pointer ">
              <FiShoppingCart  size={25} className="text-[#ff4d2d]" />
              <span className="absolute right-[-18px] top-[-15px] flex items-center justify-center w-6 h-6 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] text-xs font-bold">
                {cartItems.length}
              </span>
            </div>
            {/* My Order */}
            <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium ">
              My Order
            </button>
          </>
        )}

        {/* Profile */}
        <div
          onClick={() => setShowInfo((prev) => !prev)}
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer "
        >
          {userData?.fullName.slice(0, 1)}
        </div>
        {showInfo && (
          // Profile Dropdown
          <div className="fixed top-20 right-4 sm:right-[10%] md:right-[12%] lg:right-[15%] xl:right-[20%] w-44 sm:w-48 bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-[9999] transition-all duration-200 ease-in-out">
            <div className="text-sm sm:text-base font-semibold text-gray-800 truncate">
              {userData?.fullName.slice(0, 15)}
            </div>
            {userData.role == "user" && (
              <div className="md:hidden text-[#ff4d2d] text-sm sm:text-base font-semibold cursor-pointer hover:text-[#e63e1c] transition-colors duration-150">
                My Order
              </div>
            )}

            <div
              onClick={handleLogOut}
              className="text-[#ff4d2d] text-sm sm:text-base font-semibold cursor-pointer hover:text-[#e63e1c] transition-colors duration-150"
            >
              Log out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
