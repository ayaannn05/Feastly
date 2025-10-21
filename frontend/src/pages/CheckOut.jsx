import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { useState } from "react";
import { useSelector } from "react-redux";

function CheckOut() {
  const { currentAddress } = useSelector((state) => state.user);
  // start with empty input; only set when user explicitly clicks 'current location'
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6 ">
      <div
        className=" cursor-pointer absolute top-[20px] left-[20px] z[10] "
        onClick={() => navigate("/cart")}
      >
        <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
      </div>
      <div className="w-full max-w-[900px] bg-white p-6 rounded-2xl shadow-xl space-y-6 ">
        <h1 className="text-2xl font-bold text-gray-800">CheckOut</h1>
        {/* Delivery Location Section */}
        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
            <IoLocationSharp className="text-[#ff4d2d]" /> Delivery Location
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter your delivery address"
              className="cursor-pointer flex-1 text-sm p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <button className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center  ">
              <IoSearchOutline size={17} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentAddress) setAddress(currentAddress);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center  "
            >
              <TbCurrentLocation size={17} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckOut;
