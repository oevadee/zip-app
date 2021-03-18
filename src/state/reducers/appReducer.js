import { TOGGLE_POPUP, TOGGLE_NAV } from "../types/appTypes";

const initialState = {
  popupVisible: false,
  navOpen: false,
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
    default: {
      return state;
    }
  }
};

export default appReducer;
