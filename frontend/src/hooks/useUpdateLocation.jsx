import { useEffect } from "react";

import { serverUrl } from "../App";
import axios from "axios";

function useUpdateLocation() {
  useEffect(() => {
    const updateLocation = async (lat, lon) => {
      const result = await axios.post(
        `${serverUrl}/api/user/update-location`,
        {
          lat,
          lon,
        },
        { withCredentials: true }
      );
      console.log(result.data);
    };
    navigator.geolocation.watchPosition((position) => {
      updateLocation(position.coords.latitude, position.coords.longitude);
    });
  }, []);
}

export default useUpdateLocation;
