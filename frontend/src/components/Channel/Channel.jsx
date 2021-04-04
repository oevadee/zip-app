import React from 'react';
import { PropTypes } from 'prop-types';
import './Channel.scss';

// Redux
import { useDispatch } from 'react-redux';
import { setChannel } from '../../state/actions/channelAction';
import { toggleNav } from '../../state/actions/appAction';

const Channel = ({ id, channelName }) => {
  const channelDispatch = useDispatch();

  return (
    <div
      className="channel"
      onClick={() => {
        channelDispatch(
          setChannel({
            channelId: id,
            channelName: channelName,
          }),
        );
        channelDispatch(toggleNav());
      }}
    >
      <h3 className="channel__roomName">
        # <span>{channelName}</span>
      </h3>
    </div>
  );
};

Channel.propTypes = {
  id: PropTypes.number.isRequired,
  channelName: PropTypes.string.isRequired,
  setMobileNavOpen: PropTypes.func,
};

Channel.defaultProps = {
  channelId: null,
  channelName: null,
};

export default Channel;
