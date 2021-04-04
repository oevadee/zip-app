import React, { useState } from 'react';
import './ChatRoute.scss';
import { useParams } from 'react-router';

// Components
import { Message, Header } from '/src/components';
import { Input, Spinner } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { getCurrentTimestamp } from '../../utils';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { mutate } from 'swr';

const ChatRoute = ({ user }) => {
  const [channelName, setChannelName] = useState('');
  const { channelId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const messages = useFetch(`/api/chat/messages/${channelId}`);

  const onSubmit = async (values) => {
    const { message } = values;
    const timestamp = getCurrentTimestamp();
    const data = await axios.post(
      `http://localhost:8080/api/chat/messages?userId=${user.id}`,
      { message, timestamp, channelId },
    );
    mutate('http://localhost:8080/api/chat');
    reset();
  };

  if (!messages) return <Spinner color="pink" />;

  return (
    <div className="chat">
      <Header title="Chat" />
      <div className="chat__messages">
        {messages &&
          messages.map((message) => (
            <Message key={message.message.id} message={message} />
          ))}
      </div>
      <div className="chat__input">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            size="lg"
            name="message"
            ref={register}
            disabled={!channelId}
            placeholder={`Message #${channelName}`}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatRoute;
