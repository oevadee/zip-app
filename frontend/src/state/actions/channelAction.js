import { SET_CHANNEL } from "../types/channelTypes";

export const setChannel = (channelInfo) => ({
  type: SET_CHANNEL,
  payload: channelInfo,
});
