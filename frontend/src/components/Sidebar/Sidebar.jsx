import React from "react";
import { PropTypes } from "prop-types";
import "./Sidebar.scss";

// Components
import { Channel } from "/src/components";

// Icons
import { Spinner } from "@chakra-ui/spinner";

// Firebase
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Avatar, Heading } from "@chakra-ui/react";
import axios from "axios";
import { logoutUser } from "../../state/actions/userAction";
import config from "../../config";
import { Bell as BellIcon } from "react-feather";

const Sidebar = ({ user, mutate, channels }) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.app.notificationsAmount);

  const handleAddChannel = async () => {
    const channelName = prompt(`Enter a new channel name`);
    if (channelName)
      await axios.post(`http://${config.API_HOST}/api/chat/channel`, {
        channelName,
      });
    mutate();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("secret");
  };

  if (!channels) return <Spinner color="pink" />;

  return (
    <Box maxW={200} minW={200} className={`sidebar`}>
      <div className="sidebar__user">
        <div className="sidebar__userHeader">
          <Avatar className="sidebar__userHeader__avatar" src={user.photo} />
          <Heading as="h4" size="xs">
            {user.name.split(" ")[0]}
          </Heading>
          <Link to="/notifications">
            <BellIcon />
          </Link>
        </div>
      </div>
      <div className="sidebar__selector">
        <Channel channelName="Expenses" url="/expenses" />
        <Channel channelName="Settings" url="/settings" />
        <Channel channelName="Chat room" icon onClick={handleAddChannel} />
        <div className="sidebar__chatList">
          {channels.map(({ name, id }) => (
            <Channel key={id} id={id} channelName={name} url={`/chat/${id}`} />
          ))}
        </div>
      </div>
      <div className="sidebar__logout">
        <Button onClick={handleLogout} colorScheme="pink">
          Logout
        </Button>
      </div>
    </Box>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
};

Sidebar.defaultProps = {
  user: null,
};

export default Sidebar;
