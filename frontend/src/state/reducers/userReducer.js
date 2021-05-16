const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...state,
        user: null,
      };
    }
    case 'CHANGE_USER_NAME': {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
