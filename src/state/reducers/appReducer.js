import { TOGGLE_POPUP } from '../types/appTypes';

const initialState = {
  popupVisible: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_POPUP: {
      return {
        ...state,
        popupVisible: !state.popupVisible,
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
