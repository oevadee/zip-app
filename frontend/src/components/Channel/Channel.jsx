import React from 'react';
import { PropTypes } from 'prop-types';
import './Channel.scss';

const Channel = ({ channelName, ...props }) => {

  return (
    <div className="channel" {...props}>
      <h3 className="channel__roomName">
        # <span>{channelName}</span>
      </h3>
    </div>
  );
};

Channel.propTypes = {
  channelName: PropTypes.string.isRequired,
};

Channel.defaultProps = {
  channelName: null,
};

export default Channel;
