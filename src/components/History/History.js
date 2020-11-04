import React from "react";
import "./History.scss";

// Components
import { Avatar } from "@material-ui/core";

const History = ({ historyEl, historyOf }) => {
  return (
    <div className="history">
      <div className="history__user">
        <Avatar src={historyOf.photo} />
        <p>{historyOf.displayName}</p>
      </div>
      <p className="history__expense">{historyEl.value}</p>
      <p className="history__timestamp">{new Date(historyEl.timestamp?.toDate()).toUTCString()}</p>
    </div>
  );
};

export default History;
