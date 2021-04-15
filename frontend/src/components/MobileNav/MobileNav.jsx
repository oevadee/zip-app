import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import './MobileNav.scss';

// Components
import { Channel } from '/src/components';

// Icons
import { Bell as NotificationIcon, Plus as AddIcon } from 'react-feather';
import { Spinner } from '@chakra-ui/spinner';

// Firebase
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Button, Box, Avatar, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { logoutUser } from '../../state/actions/userAction';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { toggleNav } from '../../state/actions/appAction';
import config from "../../config";

const MobileNav = ({ user, mutate, channels }) => {
  const navOpen = useSelector((state) => state.app.navOpen);
  const dispatch = useDispatch();
  const btnRef = useRef();
  const isOpen = useBreakpointValue({ base: false });

  const handleAddChannel = async () => {
    const channelName = prompt(`Enter a new channel name`);
    if (channelName) await axios.post(`http://${config.API_HOST}/api/chat/channel`, { channelName });
    mutate();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('secret');
  };

  const handleSidebarClose = () => {
    dispatch(toggleNav());
  };

  if (!channels) return <Spinner color="pink" />;

  return (
    <Drawer
      isOpen={isOpen ? isOpen : navOpen}
      placement="left"
      onClose={handleSidebarClose}
      finalFocusRef={btnRef}
      size="xs"
    >
      <DrawerOverlay>
        <DrawerContent className="sidebar">
          {!isOpen && <DrawerCloseButton />}
          <DrawerHeader>
            <div className="sidebar__userHeader">
              <Avatar
                className="sidebar__userHeader__avatar"
                src={user.photo}
              />
              <Heading as="h4" size="xs">
                {user.name}
              </Heading>
            </div>
          </DrawerHeader>

          <DrawerBody p={0}>
            <Channel
              channelName="Expenses"
              url="/expenses"
              onChannelClick={handleSidebarClose}
            />
            <Channel
              channelName="Settings"
              url="/settings"
              onChannelClick={handleSidebarClose}
            />
            <Channel channelName="Chat room" icon onClick={handleAddChannel} />
            <div className="sidebar__chatList">
              {channels.map(({ name, id }) => (
                <Channel
                  id={id}
                  channelName={name}
                  url={`/chat/${id}`}
                  onChannelClick={handleSidebarClose}
                />
              ))}
            </div>
          </DrawerBody>

          <DrawerFooter>
            <div className="sidebar__logout">
              <Button onClick={handleLogout} colorScheme="pink">
                Logout
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MobileNav;
