import React from 'react';
import './ChatRoute.scss';
import { useParams } from 'react-router';

// Components
import { Header } from '/src/components';
import { Chat } from './components';

const ChatRoute = () => {
  const { channelId } = useParams();

  return (
    <div className="chat">
      <Header title="Chat" />
      <Chat channelId={channelId} />
    </div>
  );
};

export default ChatRoute;
