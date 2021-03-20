import React, { useEffect, useState } from "react";
import "./ChatRoute.scss";

import db from "../../firebase";
import { useParams } from "react-router";

// Components
import { Message, Header } from "/src/components";

// Icons
import { Plus as AddCircleIcon } from "react-feather";

import { useForm } from "react-hook-form";
import { getCurrentTimestamp } from "../../utils/getCurrentTimestamp";

const ChatRoute = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const { channelId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const timestamp = getCurrentTimestamp();

  useEffect(() => {
    channelId &&
      db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    db.collection("channels")
      .doc(channelId)
      .onSnapshot((snap) => setChannelName(snap.data().channelName));
  }, [channelId]);

  const onSubmit = (data) => {
    db.collection("channels").doc(channelId).collection("messages").add({
      message: data.message,
      timestamp: timestamp,
      user: user,
    });
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
        <AddCircleIcon fontSize="large" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="message"
            ref={register}
            disabled={!channelId}
            placeholder={`Message #${channelName}`}
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
