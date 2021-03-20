import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import "./Sidebar.scss";

// Components
import { Avatar } from "@material-ui/core";
import { Channel, Button } from "/src/components";

// Icons
import { Settings as SettingsIcon, Plus as AddIcon } from "react-feather";

// Firebase
import db, { auth } from "/src/firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "../../state/actions/appAction";

const Sidebar = ({ user }) => {
  const [channels, setChannels] = useState([]);
  const navOpen = useSelector((state) => state.app.navOpen);
  const navDispatch = useDispatch();

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

  const handleNavToggle = () => {
    navDispatch(toggleNav());
  };

  return (
    <div className={`sidebar ${navOpen ? `sidebar--mobileOn` : ``}`}>
      <div className="sidebar__user">
        <div className="sidebar__userHeader">
          <Avatar src={user.photo} />
          <h3>{user.displayName}</h3>
        </div>
        <SettingsIcon />
      </div>
      <div className="sidebar__selector">
        <Link to="/expenses">
          <div className="sidebar__selectorHeader" onClick={handleNavToggle}>
            <h2>Expenses</h2>
          </div>
        </Link>
        <div className="sidebar__selectorHeader--withoutHover">
          <h2>Chat room</h2>
          <AddIcon onClick={handleAddChannel} />
        </div>
        <div className="sidebar__chatList">
          {channels.map(({ channel, id }) => (
            <Link to={`/chat/${id}`} key={id}>
              <Channel
                key={id}
                id={id}
                channelName={channel.channelName}
                onClick={handleNavToggle}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebar__logout">
        <Button
          primary={false}
          text={"Logout"}
          onClick={() => auth.signOut()}
        />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
};

Sidebar.defaultProps = {
  user: null,
};

export default Sidebar;
