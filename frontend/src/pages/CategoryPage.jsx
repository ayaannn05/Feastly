
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
    
  useEffect(() => {
    if (!category) return;

    const handleGetItemByCategory = async () => {
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
      }
    };

 

 handleGetItemByCategory();
   
  }, [category]);



  return (
    <div>
        <Nav/>
        <div className="mt-20 w-full max-w-6xl flex flex-col gap-5 items-start p-2.5 mt-20">
            {categoryItems.length === 0 ? (
                <p className="text-center mt-10 text-gray-500">No items found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {categoryItems?.map((item, index) => (
                        <FoodCard key={index} data={item} />
                    ))}   
                </div>
            )}
        </div>
    </div>
  );
}


export default CategoryPage;