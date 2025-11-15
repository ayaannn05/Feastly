import { useSelector } from "react-redux";
import OwnerOrderCard from "../components/OwnerOrderCard";
import UserOrderCard from "../components/userOrderCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function MyOrder() {
  const { userData, myOrders } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className=" w-full min-h-screen bg-[#fff9f6] flex justify-center px-4  ">
      <div className="w-full max-w-[800px] py-4">
        <div className="flex items-center gap-[20px] mb-6">
          <div className="z-[10] cursor-pointer" onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-2xl font-bold text-start">My Orders</h1>
        </div>

        <div className="space-y-4">
          {!myOrders || myOrders.length === 0 ? (
            userData?.role === "user" ? (
              <UserOrderCard data={null} />
            ) : (
              <OwnerOrderCard data={null} />
            )
          ) : (
            myOrders.map((order, index) =>
              userData.role === "user" ? (
                <UserOrderCard data={order} key={order._id || index} />
              ) : (
                <OwnerOrderCard data={order} key={order._id || index} />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
