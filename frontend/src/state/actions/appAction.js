import { TOGGLE_POPUP, TOGGLE_NAV } from "../types/appTypes";

export const togglePopup = (popupVisible) => ({
  type: TOGGLE_POPUP,
  payload: popupVisible,
});

export const toggleNav = (navOpen) => ({
  type: TOGGLE_NAV,
  payload: navOpen,
});
