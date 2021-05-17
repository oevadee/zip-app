import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from '../types/userTypes';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          photo: action.payload.photo,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
