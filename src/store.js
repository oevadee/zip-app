import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import channelReducer from "./state/reducers/channelReducer";
import userReducer from "./state/reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
