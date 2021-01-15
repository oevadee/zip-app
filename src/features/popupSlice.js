import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    popupVisible: false,
  },
  reducers: {
    setPopupVisible: state => {
      state.popupVisible = !state.popupVisible
    },
  },
});

export const { setPopupVisible } = popupSlice.actions;
export const selectPopupVisible = state => state.popup.popupVisible;

export default popupSlice.reducer;
