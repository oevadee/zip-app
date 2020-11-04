import React from "react";
import "./History.scss";

// Components
import { Avatar } from "@material-ui/core";

const History = ({ user }) => {
  return (
    <div className="history">
      <div className="history__user">
        <Avatar src={user.photo} />
        <p>{user.displayName}</p>
      </div>
      <p className="history__expense">120 pln</p>
    </div>
  );
};

export default History;
