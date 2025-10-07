import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/userSlice";

function useGetCity() {
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEO_API_KEY;
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
        );

        if (res.data?.results?.[0]?.city) {
          dispatch(setCity(res.data.results[0].city));
        } else {
          console.error("City not found in response");
          dispatch(setCity("Unknown"));
        }
      } catch (error) {
        console.error("Error getting location:", error);
        dispatch(setCity("Unknown"));
      }
    };

    if (apikey) {
      getLocation();
    } else {
      console.error("Missing Geoapify API key");
    }
  }, [dispatch, apikey, userData]);
}

export default useGetCity;
