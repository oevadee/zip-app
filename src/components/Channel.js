import React from "react";
import "./styles/Channel.scss";

// Redux
import { useDispatch } from "react-redux";
import { setAppInfo, setChatOpen } from "../features/appSlice";

const Channel = ({ id, channelName }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="channel"
      onClick={() =>
        dispatch(
          setAppInfo({
            channelId: id,
            channelName: channelName,
            currentlyOpen: 'Chat'
          }),
        )
      }
    >
      <h3 className="channel__roomName">
        # <span>{channelName}</span>
      </h3>
    </div>
  );
};

export default Channel;
