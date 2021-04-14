import React from 'react';
import './ChatRoute.scss';
import { useParams } from 'react-router';

// Components
import { Header } from '/src/components';
import { Chat } from './components';
import { Box } from '@chakra-ui/react';

const ChatRoute = () => {
  const { channelId } = useParams();

  return (
    <Box className="chat">
      <Header title="Chat" />
      <Chat channelId={channelId} />
    </Box>
  );
};

export default ChatRoute;
