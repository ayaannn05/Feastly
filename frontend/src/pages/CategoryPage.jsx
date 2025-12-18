
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { useState } from "react";
import Nav from "../components/Nav";
import FoodCard from "../components/FoodCard";


function CategoryPage() {
    const { category } = useParams();
    const [categoryItems, setCategoryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    if (!category) return;

    const handleGetItemByCategory = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-category/${category}`,
          {
            withCredentials: true,
          }
        );
        
        console.log("category data:", result.data);
        setCategoryItems(result.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

 

 handleGetItemByCategory();
   
  }, [category]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f6] to-orange-50">
        <Nav/>
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🍽️</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent capitalize">
                        {category}
                    </h1>
                </div>
                <p className="text-gray-600 ml-15 text-lg">
                    Discover delicious {category} items from our restaurants
                </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading {category} items...</p>
                </div>
            ) : categoryItems.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center border border-orange-100">
                        <div className="mb-6">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                                <svg 
                                    className="w-12 h-12 text-orange-500" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                                    />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            No Items Available
                        </h2>
                        <p className="text-gray-600 mb-2">
                            We couldn't find any items in the
                        </p>
                        <p className="text-orange-600 font-semibold text-lg mb-6 capitalize">
                            "{category}" category
                        </p>
                        {/* <div className="space-y-3 text-left bg-orange-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-orange-500 mt-0.5">•</span>
                                Try browsing other categories
                            </p>
                            <p className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-orange-500 mt-0.5">•</span>
                                Check back later for new items
                            </p>
                            <p className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-orange-500 mt-0.5">•</span>
                                Search for specific dishes
                            </p>
                        </div> */}
                    </div>
                </div>
            ) : (
                /* Items Grid */
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-gray-600">
                            <span className="font-semibold text-orange-600">{categoryItems.length}</span> item{categoryItems.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryItems.map((item, index) => (
                            <div 
                                key={index}
                                className="transform transition-all duration-300 hover:scale-105"
                            >
                                <FoodCard data={item} />
                            </div>
                        ))}   
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}


export default CategoryPage;