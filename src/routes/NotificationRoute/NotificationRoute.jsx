import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

// Components
import { Header } from "../../components";
import db, { auth } from "../../firebase";
import { Card } from '/src/utilityComponents';

const NotificationsRoute = () => {
  return (
    <div className="history">
      <Header title="Notifications" goBackButton />
      <Card>
        <p>tester</p>
      </Card>
    </div>
  )
}

export default NotificationsRoute
