import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import './Sidebar.scss';

// Components
import { Channel } from '/src/components';

// Icons
import { Bell as NotificationIcon, Plus as AddIcon } from 'react-feather';
import { Spinner } from '@chakra-ui/spinner';

// Firebase
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Avatar, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { logoutUser } from '../../state/actions/userAction';

const Sidebar = ({ user, mutate, channels }) => {
  const navOpen = useSelector((state) => state.app.navOpen);
  const dispatch = useDispatch();

  const handleAddChannel = async () => {
    const channelName = prompt(`Enter a new channel name`);
    if (channelName) await axios.post('/api/chat/channel', { channelName });
    mutate();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('secret');
  };

  if (!channels) return <Spinner color="pink" />;

  return (
    <Box w={220} className={`sidebar ${navOpen && `sidebar--mobileOn`}`}>
      <div className="sidebar__user">
        <div className="sidebar__userHeader">
          <Avatar className="sidebar__userHeader__avatar" src={user.photo} />
          <Heading as="h3" size="xs">
            {user.name}
          </Heading>
        </div>
        <Link to="/notifications">
          <NotificationIcon />
        </Link>
      </div>
      <div className="sidebar__selector">
        <Link to="/expenses">
          <div className="sidebar__selectorHeader">
            <h2>Expenses</h2>
          </div>
        </Link>
        <div className="sidebar__selectorHeader--withoutHover">
          <h2>Chat room</h2>
          <AddIcon
            className="sidebar__selectorHeader__icon"
            onClick={handleAddChannel}
          />
        </div>
        <div className="sidebar__chatList">
          {channels.map(({ name, id }) => (
            <Link to={`/chat/${id}`} key={id}>
              <Channel key={id} id={id} channelName={name} />
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebar__logout">
        <Button onClick={handleLogout} colorScheme="pink">
          Logout
        </Button>
      </div>
    </Box>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
};

Sidebar.defaultProps = {
  user: null,
};

export default Sidebar;
