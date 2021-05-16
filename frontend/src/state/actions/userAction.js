import { LOGIN_USER, LOGOUT_USER, CHANGE_USER_NAME } from '../types/userTypes';

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: null,
});

export const changeUserName = (name) => ({
  type: CHANGE_USER_NAME,
  payload: name,
});