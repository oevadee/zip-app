const initialState = {
  channelId: null,
  channelName: '',
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CHANNEL: {
      return {
        ...state,
        channelId: action.payload.channelId
      }
    }
  }
}
