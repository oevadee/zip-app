import { TOGGLE_POPUP, TOGGLE_NAV, ADD_NOTIFICATION } from '../types/appTypes';

export const togglePopup = (popupVisible) => ({
  type: TOGGLE_POPUP,
  payload: popupVisible,
});

export const toggleNav = (navOpen) => ({
  type: TOGGLE_NAV,
  payload: navOpen
});

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: notification
});