import React from 'react';
import { PropTypes } from 'prop-types';
import './Channel.scss';
import { Link } from 'react-router-dom';
import { Bell as NotificationIcon, Plus as AddIcon } from 'react-feather';

const Channel = ({
  channelName,
  icon = false,
  url = null,
  onChannelClick,
  ...props
}) => {
  console.log(channelName, url);
  return (
    <Link to={url}>
      <div
        className={`channel${!url ? '--withoutHover' : ''}`}
        onClick={onChannelClick}
      >
        <h2>{channelName}</h2>
        {icon && <AddIcon className="channel__icon" {...props} />}
      </div>
    </Link>
  );
};

Channel.propTypes = {
  channelName: PropTypes.string.isRequired,
};

Channel.defaultProps = {
  channelName: null,
};

export default Channel;
