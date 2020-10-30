import { createSlice } from "@reduxjs/toolkit";

export const sectionSlice = createSlice({
  name: "section",
  initialState: {
    activeSection: "expenses",
  },
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload.activeSection
    },
  },
});

export const { setActiveSection } = sectionSlice.actions;

export const selectActiveSection = (state) => state.section.activeSection;

export default sectionSlice.reducer;