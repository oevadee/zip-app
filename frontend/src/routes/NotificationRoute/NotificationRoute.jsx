import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

// Components
import { Header } from "../../components";
import db, { auth } from "../../firebase";
import { Card } from "/src/utilityComponents";
import { getUserNotifications } from "./utils/getUserNotifications";
import { useDispatch, useSelector } from "react-redux";

const NotificationsRoute = ({ users }) => {
  const notifications = useSelector((state) => state.app.notifications);
  const notificationsDispatch = useDispatch();

  useEffect(() => {
    getUserNotifications(users, notificationsDispatch);
  }, []);

  return (
    <div className="history">
      <Header title="Notifications" goBackButton />
      <Card>
        <p>tester</p>
      </Card>
    </div>
  );
};

export default NotificationsRoute;
