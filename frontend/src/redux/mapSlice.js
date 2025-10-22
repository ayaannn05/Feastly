import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    location: { lat: null, lon: null },
  },
  reducers: {
    setLocation(state, action) {
      const { lat, lon } = action.payload;
      state.location.lat = lat;
      state.location.lon = lon;
    },
    setAddrress(state, action) {
      state.address = action.payload;
    },
  },
});

export const { setLocation, setAddrress } = mapSlice.actions;
export default mapSlice.reducer;
