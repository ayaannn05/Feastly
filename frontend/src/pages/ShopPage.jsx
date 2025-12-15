import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import FoodCard from "../components/FoodCard";

function ShopPage() {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    if (!shopId) return;

    const handleGetShop = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-by-id/${shopId}`,
          {
            withCredentials: true,
          }
        );
        setShop(result.data);
        console.log("Shop data:", result.data);
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    };

 

 
    handleGetShop();
   
  }, [shopId]);



  return (
    <div className="mt-20 w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Nav />
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
        {/* Shop Header */}
        {shop && (
          <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative h-48 md:h-64">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{shop.name}</h1>
                <p className="text-sm md:text-base">
                  {shop.address}, {shop.city}, {shop.state}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Items Section */}
        {shop && (
          <div className="w-full flex flex-col gap-5">
            <h2 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
              Menu Items
            </h2>
            {shop.items && shop.items.length === 0 ? (
              <p className="text-gray-600 text-lg">No items available at this shop yet.</p>
            ) : (
              <div className="w-full h-auto flex flex-wrap gap-5 justify-center">
                {shop.items?.map((item, index) => (
                  <FoodCard key={index} data={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;