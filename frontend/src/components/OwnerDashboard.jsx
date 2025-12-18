import { useSelector } from "react-redux";
import { FaUtensils, FaPen, FaPlus } from "react-icons/fa";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import OwnerItemCard from "./OwnerItemCard.jsx";

function OwnerDashboard() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30 flex flex-col items-center">
      <Nav />

      <div className="w-full max-w-6xl px-4 sm:px-6 py-8">
        {!myShopData && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaUtensils className="text-white w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                  Start Your Restaurant Journey
                </h2>
                <p className="text-gray-600 mb-8 text-base leading-relaxed max-w-md">
                  Join our platform and connect with thousands of hungry
                  customers. Grow your business with our powerful tools and
                  analytics.
                </p>
                <button
                  onClick={() => navigate("/create-edit-shop")}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <FaPlus className="w-4 h-4" />
                  Create Restaurant
                </button>
              </div>
            </div>
          </div>
        )}

        {myShopData && (
          <div className="flex flex-col gap-8">
            {/* Restaurant Header Card */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={myShopData.image}
                  alt={myShopData.name}
                  className="w-full h-56 sm:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <button
                  onClick={() => navigate("/create-edit-shop")}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-orange-600 p-3 rounded-xl shadow-lg hover:bg-white hover:scale-105 transition-all duration-200 group"
                >
                  <FaPen className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">
                    {myShopData.name}
                  </h1>
                  <div className="flex items-center gap-2 text-sm sm:text-base text-white/90">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {myShopData.city}, {myShopData.state}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
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
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {myShopData.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Menu Items
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {myShopData.items.length > 0
                      ? `${myShopData.items.length} ${
                          myShopData.items.length === 1 ? "item" : "items"
                        } available`
                      : "No items added yet"}
                  </p>
                </div>
                {myShopData.items.length > 0 && (
                  <button
                    onClick={() => navigate("/add-item")}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Item</span>
                  </button>
                )}
              </div>

              {myShopData.items.length === 0 ? (
                <div className="bg-white shadow-lg rounded-2xl p-10 sm:p-12 border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FaUtensils className="text-orange-500 w-10 h-10" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    Build Your Menu
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Start adding delicious items to your menu and let customers
                    discover what makes your restaurant special.
                  </p>
                  <button
                    onClick={() => navigate("/add-item")}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    Add Your First Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {myShopData.items.map((item, index) => (
                    <OwnerItemCard data={item} key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;
