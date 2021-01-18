import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import "./Dashboard.scss";

import Header from "../Header/Header";
import Chat from "../Chat/Chat";
import Expenses from "../Expenses/Expenses";

import db from "../../firebase";
import { useSelector } from "react-redux";
import { selectActiveSection } from "../../features/sectionSlice";
import { selectPopupVisible } from "../../features/popupSlice";

const Dashboard = ({ setMobileNavOpen, mobileNavOpen }) => {
  const [users, setUsers] = useState([]);
  const activeSection = useSelector(selectActiveSection);
  const popupVisible = useSelector(selectPopupVisible);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="dashboard">
      <Header
        activeSection={activeSection}
        setMobileNavOpen={setMobileNavOpen}
        mobileNavOpen={mobileNavOpen}
      />
      {activeSection === "chat" ? (
        <Chat />
      ) : (
        <Expenses
          activeSection={activeSection}
          popupVisible={popupVisible}
          users={users}
        />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  mobileNavOpen: PropTypes.bool,
  setMobileNavOpen: PropTypes.func,
};

Dashboard.defaultProps = {
  user: null,
  mobileNavOpen: false,
};

export default Dashboard;
