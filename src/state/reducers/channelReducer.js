import { SET_CHANNEL } from "../types/channelTypes";

const initialState = {
  channelId: "xxiO3R5c7TbsnEXvMnml",
  channelName: "PFD",
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNEL: {
      return {
        ...state,
        channelId: action.payload.channelId,
        channelName: action.payload.channelName,
      };
    }
    default: {
      return state;
    }
  }
};

export default channelReducer;
