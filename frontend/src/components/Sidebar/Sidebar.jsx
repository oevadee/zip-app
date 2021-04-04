import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import './Sidebar.scss';

// Components
import { Channel } from '/src/components';

// Icons
import { Bell as NotificationIcon, Plus as AddIcon } from 'react-feather';

// Firebase
import db, { auth } from '/src/firebase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNav } from '../../state/actions/appAction';
import { Button, Box, Avatar, Heading } from '@chakra-ui/react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { mutate } from 'swr';

const Sidebar = ({ user, channels }) => {
  const navOpen = useSelector((state) => state.app.navOpen);
  const navDispatch = useDispatch();

  const handleAddChannel = async () => {
    const channelName = prompt(`Enter a new channel name`);

    if (channelName) {
      const data = await axios.post('http://localhost:8080/api/chat/channel', {
        channelName,
      });
    }
  };

  const handleNavToggle = () => {
    navDispatch(toggleNav());
    mutate('http://localhost:8080/api/chat');
  };

  return (
    <Box w={220} className={`sidebar ${navOpen && `sidebar--mobileOn`}`}>
      <div className="sidebar__user">
        <div className="sidebar__userHeader">
          <Avatar className="sidebar__userHeader__avatar" src={user.photo} />
          <Heading as="h3" size="xs">
            {user.name}
          </Heading>
        </div>
        <Link to="/notifications" onClick={handleNavToggle}>
          <NotificationIcon />
        </Link>
      </div>
      <div className="sidebar__selector">
        <Link to="/expenses">
          <div className="sidebar__selectorHeader" onClick={handleNavToggle}>
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
              <Channel
                key={id}
                id={id}
                channelName={name}
                onClick={handleNavToggle}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebar__logout">
        <Button colorScheme="pink" onClick={() => auth.signOut()}>
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
