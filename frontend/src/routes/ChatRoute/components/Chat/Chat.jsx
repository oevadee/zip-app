import React, { useEffect } from 'react';

import { Message } from '/src/components';
import { Input, Spinner } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getCurrentTimestamp } from '/src/utils';
import axios from 'axios';
import useSWR from 'swr';
import './Chat.scss';
import config from "../../../../config";

const Chat = ({ channelId }) => {
  const { data: messages, mutate } = useSWR(`/api/chat/messages/${channelId}`);
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    mutate();
  }, [channelId]);

  const onSubmit = async (values) => {
    const { message } = values;
    const timestamp = getCurrentTimestamp();
    await axios.post(`/api/chat/messages?userId=${user.id}`, {
      message,
      timestamp,
      channelId,
    });
    mutate();
    reset();
  };

  if (!messages) return <Spinner color="pink" />;

  return (
    <>
      <div className="chatBox">
        <div className="chat__messages">
          {messages.map((message) => (
            <Message key={message.message.id} message={message} />
          ))}
        </div>
      </div>
      <div className="chat__input">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            size="lg"
            name="message"
            ref={register}
            disabled={!channelId}
            placeholder={`Start typing...`}
            autoComplete="off"
          />
        </form>
      </div>
    </>
  );
};

export default Chat;
