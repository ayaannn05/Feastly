import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";

import { useSelector } from "react-redux";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function CheckOut() {
  const { location, address } = useSelector((state) => state.map);
  const navigate = useNavigate();
  const onDragEnd = (event) => {
    const marker = event.target;
    const position = marker.getLatLng();
    console.log("Marker dragged to:", position);
    // You can dispatch an action here to update the location in the Redux store if needed
  };

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
              value={address}
              placeholder="Enter your delivery address"
              className="cursor-pointer flex-1 text-sm p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
            />
            <button className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center  ">
              <IoSearchOutline size={17} />
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center  ">
              <TbCurrentLocation size={17} />
            </button>
          </div>
          <div>
            <MapContainer
              center={[location?.lat, location?.lon]}
              zoom={16}
              className="h-[300px] w-full rounded-lg z-0 cursor-pointer "
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[location?.lat, location?.lon]}
                draggable
                eventHandlers={{ dragend: onDragEnd }}
              />
            </MapContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckOut;
