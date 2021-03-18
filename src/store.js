import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import channelReducer from "./state/reducers/channelReducer";
import userReducer from "./state/reducers/userReducer";
import appReducer from "./state/reducers/appReducer";

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
  app: appReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
