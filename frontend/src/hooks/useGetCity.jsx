import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";
import { setAddrress, setLocation } from "../redux/mapSlice";

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
        dispatch(setLocation({ lat: latitude, lon: longitude }));

        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
        );

        dispatch(setCurrentCity(res?.data?.results[0]?.city));
        dispatch(setCurrentState(res?.data?.results[0]?.state));
        dispatch(
          setCurrentAddress(
            res?.data?.results[0]?.address_line2 ||
              res?.data?.results[0]?.address_line1
          )
        );
        dispatch(setAddrress(res?.data?.results[0]?.formatted));
      } catch (error) {
        console.error("Error getting location:", error);
        dispatch(setCurrentCity("Unknown"));
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
