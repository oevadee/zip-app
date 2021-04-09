import React from 'react';
import './Message.scss';
import { Avatar } from '@chakra-ui/avatar';

const Message = ({ message }) => {
  return (
    <div className="message">
      <Avatar src={message.user.photo} />
      <div className="message__info">
        <h4>
          {message.user.name}
          <span className="message__timestamp">
            {message.message.timestamp}
          </span>
        </h4>
        <p>{message.message.message}</p>
      </div>
    </div>
  );
};

export default Message;
