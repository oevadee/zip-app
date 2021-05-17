import React from 'react';
import { PropTypes } from 'prop-types';
import './Channel.scss';
import { Link } from 'react-router-dom';
import { Plus as AddIcon } from 'react-feather';

const Channel = ({
  channelName,
  icon = false,
  url = null,
  onChannelClick,
  ...props
}) => {
  const LinkWrapper = ({ children }) => <Link to={url}>{children}</Link>;

  const ChannelBody = () => (
    <div
      className={`channel${!url ? '--withoutHover' : ''}`}
      onClick={onChannelClick}
    >
      <h2>{channelName}</h2>
      {icon && <AddIcon className='channel__icon' {...props} />}
    </div>
  );

  if (url)
    return (
      <LinkWrapper>
        <ChannelBody />
      </LinkWrapper>
    );
  else return <ChannelBody />;
};

Channel.propTypes = {
  channelName: PropTypes.string.isRequired,
};

Channel.defaultProps = {
  channelName: null,
};

export default Channel;
