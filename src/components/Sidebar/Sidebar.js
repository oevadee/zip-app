import React, { useState, useEffect } from "react";
import { PropTypes } from 'prop-types'
import "./Sidebar.scss";

// Components
import { Avatar } from "@material-ui/core";
import Channel from "../Channel/Channel";
import Button from "../Button/Button";

// Icons
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";

// Firebase
import db, { auth } from "../../firebase";


const Sidebar = ({ user, mobileNavOpen, setMobileNavOpen }) => {
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
    <div className={`sidebar ${mobileNavOpen ? `sidebar--mobileOn` : ``}`}>
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
              setMobileNavOpen={setMobileNavOpen}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__logout">
        <Button primary={false} text={"Logout"} onClick={() => auth.signOut()} />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
};

Sidebar.defaultProps = {
  user: null
};

export default Sidebar;
