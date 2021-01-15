import React, { useState, useEffect } from "react";
import "./Chat.scss";

// Components
import Message from "../Message/Message";

// Icons
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Firebase
import db from "../../firebase";
import firebase from "firebase";

// Redux
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import { selectUser } from '../../features/userSlice';

const Chat = () => {
  const channelId = useSelector(selectChannelId)
  const channelName = useSelector(selectChannelName)
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });
    setInput("");
  };

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.map((message) => {
          return (
            <Message
              timestamp={new Date(message.timestamp?.toDate()).toUTCString()}
              message={message.message}
              user={message.user}
            />
          );
        })}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            onClick={sendMessage}
            className="chat__inputButton"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
