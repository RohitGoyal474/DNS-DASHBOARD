import { createSlice } from "@reduxjs/toolkit";

const HostedZone = createSlice({
  name: "HostedZone",
  initialState: {
    HostedZoneList: null,
  },
  reducers: {
    setHostedZoneList: (state, action) => {
      state.HostedZoneList = action.payload;
    },
  },
});
export const { setHostedZoneList } = HostedZone.actions;
export default HostedZone.reducer;