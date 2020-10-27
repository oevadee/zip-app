import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
    activeSection: 'expenses'
  },
  reducers: {
    setAppInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
      state.activeSection = action.payload.activeSection
    },
  },
});

export const { setAppInfo } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectActiveSection = state => state.app.activeSection;

export default appSlice.reducer;
