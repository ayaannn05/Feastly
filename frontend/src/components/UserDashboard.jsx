import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import FoodCard from "./FoodCard";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Nav from "./Nav";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";




function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems, searchQuery, isSearching } = useSelector(
    (state) => state.user
  );
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const navigate = useNavigate();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };

  // console.log(itemsInMyCity);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);

  };

  const handleShopClick = (shopId) => {
    navigate(`/shop-page/${shopId}`);
  };

  const scrollHandler = (ref, direction) => {
    if (!ref.current) return;

    const scrollAmount = 250;
    const scrollOptions = {
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    };

    ref.current.scrollBy(scrollOptions);
  };




  useEffect(() => {
    if (cateScrollRef.current) {
      updateButton(
        cateScrollRef,
        setShowLeftCateButton,
        setShowRightCateButton
      );
      updateButton(
        shopScrollRef,
        setShowLeftShopButton,
        setShowRightShopButton
      );
      cateScrollRef.current.addEventListener("scroll", () => {
        updateButton(
          cateScrollRef,
          setShowLeftCateButton,
          setShowRightCateButton
        );
      });
      shopScrollRef.current.addEventListener("scroll", () => {
        updateButton(
          shopScrollRef,
          setShowLeftShopButton,
          setShowRightShopButton
        );
      });
    }



    return () => {
      cateScrollRef?.current?.removeEventListener("scroll", () => {
        updateButton(
          cateScrollRef,
          setShowLeftCateButton,
          setShowRightCateButton
        );
      });
      shopScrollRef?.current?.removeEventListener("scroll", () => {
        updateButton(
          shopScrollRef,
          setShowLeftShopButton,
          setShowRightShopButton
        );
      });
    };
  }, [categories]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Nav />

      {isSearching && (
        <div className="w-full max-w-6xl flex flex-col gap-5 items-center justify-center p-10 mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-orange-100">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium">Searching for "{searchQuery}"...</p>
            </div>
          </div>
        </div>
      )}

{searchItems && searchItems.length > 0 && (
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
          <h1 className="text-gray-800 text-2xl sm:text-3xl ">
            Search Results
          </h1>
          <div className="w-full relative ">
            <div
              className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scroll-smooth scrollbar-track-transaparent "
            >
              {searchItems.map((item, index) => (
                <FoodCard key={index} data={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      {searchQuery && !isSearching && (!searchItems || searchItems.length === 0) && (
        <div className="w-full max-w-6xl flex flex-col gap-5 items-center justify-center p-10 mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center border border-orange-100">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Items Found
            </h2>
            <p className="text-gray-600 mb-2">
              We couldn't find any items matching
            </p>
            <p className="text-orange-600 font-semibold text-lg mb-6">
              "{searchQuery}"
            </p>
            <div className="space-y-3 text-left">
              <p className="text-sm text-gray-500 flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                Try adjusting your search terms
              </p>
              <p className="text-sm text-gray-500 flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                Check if the item is available in {currentCity}
              </p>
              <p className="text-sm text-gray-500 flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                Browse our categories below for more options
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl ">
          Inspiration for your first order
        </h1>
        <div className="w-full relative ">
          {showLeftCateButton && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaCircleChevronLeft />
            </button>
          )}
          <div
            ref={cateScrollRef}
            className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scroll-smooth scrollbar-track-transaparent "
          >
            {categories.map((cate, index) => (
              <CategoryCard
                name={cate.category}
                image={cate.image}
                index={index}
                key={index}
                onClick={() => handleCategoryClick(cate.category)}
              />
            ))}
          </div>
          {showRightCateButton && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Best Shop in {currentCity}
        </h1>
        <div className="w-full relative">
          {showLeftShopButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaCircleChevronLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2 "
            ref={shopScrollRef}
          >
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard 
                name={shop.name} 
                image={shop.image} 
                key={index}
                onClick={() => handleShopClick(shop._id)}
              />
            ))}
          </div>
          {showRightShopButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Suggested Food Items
        </h1>

        <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
          {itemsInMyCity?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
