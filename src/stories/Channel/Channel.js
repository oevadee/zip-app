import React from "react";
import { PropTypes} from 'prop-types';
import "./Channel.scss";

// Redux
// import { useDispatch } from "react-redux";
// import { setAppInfo } from "../features/appSlice";

const Channel = ({ id, channelName }) => {
  // const dispatch = useDispatch();

  return (
    <div
      className="channel"
      onClick={() => {
        // dispatch(
        //   setAppInfo({
        //     channelId: id,
        //     channelName: channelName,
        //     currentlyOpen: "Chat",
        //   })
        // );
      }}
    >
      <h3 className="channel__roomName">
        # <span>{channelName}</span>
      </h3>
    </div>
  );
};

Channel.propTypes = {
  id: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
};

Channel.defaultProps = {
  channelId: null,
  channelName: null,
};

export default Channel;
