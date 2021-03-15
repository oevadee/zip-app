import { useEffect, useState } from "react";
import "./ChatRoute.scss";

// Components
import { Message } from "/src/components";

// Icons
import AddCircleIcon from "@material-ui/icons/AddCircle";
import db from "../../firebase";
import { useParams } from "react-router";
import { getChannelName } from "../../utils/getChannelName";
import { useDispatch } from "react-redux";
import { Header } from "../../components";

const ChatRoute = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [input, setInput] = useState("");
  const { channelId } = useParams();

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

  const sendMessage = () => {};

  return (
    <div className="chat">
      <Header title="Chat" />
      <div className="chat__messages">
        {messages.map((message, i) => (
          <Message
            user={message.user}
            key={i}
            timestamp={new Date(message.timestamp?.toDate()).toUTCString()}
            message={message.message}
          />
        ))}
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

export default ChatRoute;
