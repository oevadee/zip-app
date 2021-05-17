import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from '../types/userTypes';

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: null,
});

export const updateUser = (name, photo) => ({
  type: UPDATE_USER,
  payload: { name, photo },
});
