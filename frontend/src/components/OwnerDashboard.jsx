import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function OwnerDashboard() {
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(setUserData(null));
    } catch (err) {
      console.log(err);
    }
  };
  return <div onClick={handleLogOut}>OwnerDashboard</div>;
}

export default OwnerDashboard;
