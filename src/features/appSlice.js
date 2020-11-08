import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: 'xxiO3R5c7TbsnEXvMnml',
    channelName: 'PFD',
  },
  reducers: {
    setAppInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    }
  },
});


export const { setAppInfo } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;
