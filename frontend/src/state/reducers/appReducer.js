import { TOGGLE_POPUP, TOGGLE_NAV, ADD_NOTIFICATION } from "../types/appTypes";

const initialState = {
  popupVisible: false,
  navOpen: false,
  notifications: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_POPUP: {
      return {
        ...state,
        popupVisible: !state.popupVisible,
      };
    }
    case TOGGLE_NAV: {
      return {
        ...state,
        navOpen: !state.navOpen,
      };
    }
    case ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
