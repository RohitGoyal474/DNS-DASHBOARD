import { configureStore } from "@reduxjs/toolkit";
import HostedZoneReducer from "./slices/HostedZoneSlice.js";
import RecordReducer from "./slices/RecordRecourceSlice.js";

const appStore = configureStore({
  reducer: {
    HostedZone: HostedZoneReducer,
    Record: RecordReducer
  },
});
export default appStore