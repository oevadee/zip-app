import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
    chatOpen: false,
    expensePopupVisible: false,
    historyOpen: false,
    historyUser: null,
    currentlyOpen: 'My Doe'
  },
  reducers: {
    setAppInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
      state.chatOpen = action.payload.chatOpen;
      state.expensePopupVisible = action.payload.expensePopupVisible;
      state.historyOpen = action.payload.historyOpen
      state.historyUser = action.payload.historyUser
      state.currentlyOpen = action.payload.currentlyOpen
    },
  },
});

export const { setAppInfo } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectChatOpen = (state) => state.app.chatOpen;
export const selectExpensePopupVisible = state => state.app.expensePopupVisible;
export const selectHistoryOpen = state => state.app.historyOpen;
export const selectHistoryUser = state => state.app.historyUser;
export const selectCurrentlyOpen = state => state.app.currentlyOpen;

export default appSlice.reducer;
