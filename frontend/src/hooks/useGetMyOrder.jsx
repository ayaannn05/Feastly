import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

function useGetMyOrders() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/order/my-orders`, {
          withCredentials: true,
        });
        dispatch(setMyOrders(result.data));
      } catch (err) {
        console.error(
          "Error fetching my orders:",
          err.response?.data || err.message || err
        );
      }
    };
    fetchMyOrders();
  }, [dispatch]);
}

export default useGetMyOrders;
