import { createSlice } from "@reduxjs/toolkit";

const Record = createSlice({
  name: "Record",
  initialState: {
    RecordList: null,
  },
  reducers: {
    setRecordList: (state, action) => {
      state.RecordList = action.payload;
    },
  },
});
export const { setRecordList } = Record.actions;
export default Record.reducer;
