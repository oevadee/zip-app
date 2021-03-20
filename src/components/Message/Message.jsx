import React from 'react'
import { PropTypes } from "prop-types";
import './Message.scss';

// Icons
import { Avatar } from "@material-ui/core";

const Message = ({ timestamp, message, user }) => {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {timestamp}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
