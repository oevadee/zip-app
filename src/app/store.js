import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice'
import sectionReducer from '../features/sectionSlice'
import popupReducer from '../features/popupSlice'
import historyReducer from '../features/historySlice'

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    section: sectionReducer,
    popup: popupReducer,
    history: historyReducer,
  },
});
