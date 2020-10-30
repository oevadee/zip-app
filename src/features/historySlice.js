import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    historyOf: null,
  },
  reducers: {
    setHistoryOf: (state, action) => {
      state.historyOf = action.payload.historyOf
    },
  },
});

export const { setHistoryOf } = historySlice.actions;

export const selectHistoryOf = (state) => state.history.activeSection;

export default historySlice.reducer;