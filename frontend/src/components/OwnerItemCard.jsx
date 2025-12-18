import axios from "axios";
import React, { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

function OwnerItemCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setIsDeleting(true);
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/delete/${data._id}`,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex">
        {/* Image Section */}
        <div className="w-36 sm:w-40 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/95 backdrop-blur-sm text-orange-600 shadow-sm">
              {data.foodType}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-4 sm:p-5 flex-1 min-w-0">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
              {data.name}
            </h3>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center px-2.5 py-1  rounded-lg bg-gray-100 text-gray-700">
                <svg
                  className="w-2.5 h-2.5 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {data.category}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              ₹{data.price}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate(`/edit-item/${data._id}`)}
                className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-200 group/edit"
                title="Edit item"
              >
                <FaPen className="w-4 h-4 group-hover/edit:rotate-12 transition-transform" />
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200 group/delete disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete item"
              >
                <FaTrashAlt className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerItemCard;
