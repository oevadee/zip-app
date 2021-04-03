import React, { useEffect, useState } from 'react';
import './ChatRoute.scss';

import db from '../../firebase';
import { useParams } from 'react-router';

// Components
import { Message, Header } from '/src/components';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

// Icons
import { Plus as AddCircleIcon } from 'react-feather';

import { useForm } from 'react-hook-form';
import { getCurrentTimestamp } from '../../utils';
import axios from 'axios';

const ChatRoute = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState('');
  const { channelId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const timestamp = getCurrentTimestamp();

  const onSubmit = async (values) => {
    const {message} = values
    const data = await axios.post(
      `http://localhost:8080/api/chat?userId=${user.id}`,
      { message, timestamp },
    );

    reset();
  };

  return (
    <div className="chat">
      <Header title="Chat" />
      <div className="chat__messages">
        {messages.map((message, i) => (
          <Message
            user={message.user}
            key={i}
            timestamp={message.timestamp}
            message={message.message}
          />
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

          <button className="chat__inputButton" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoute;
