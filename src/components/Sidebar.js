import React, { useState, useEffect } from "react";
import "./styles/Sidebar.scss";

import { Avatar } from "@material-ui/core";
import Channel from "./Channel";
import Button from "./Button";

import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";

// Redux
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt(`Enter a new channel name`);

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <div className="sidebar__userHeader">
          <Avatar src={user.photo} />
          <h3>{user.displayName}</h3>
        </div>
        <SettingsIcon />
      </div>
      <div className="sidebar__chatSelector">
        <div className="sidebar__chatSelectorHeader">
          <h2>Chat room</h2>
          <AddIcon onClick={handleAddChannel} />
        </div>
        <div className="sidebar__chatList">
          {channels.map(({ channel, id }) => (
            <Channel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__logout">
        <Button text={"Logout"} onClick={() => auth.signOut()} />
      </div>
    </div>
  );
};

export default Sidebar;
