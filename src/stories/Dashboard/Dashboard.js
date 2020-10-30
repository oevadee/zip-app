import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

import Header from "../Header/Header";
import Chat from "../Chat/Chat";
import Expenses from "../Expenses/Expenses";

import db, { auth } from "../../firebase";
// import { useSelector } from "react-redux";
// import { selectActiveSection } from "../features/appSlice";

const Dashboard = ({ activeSection, popupVisible }) => {
  const [users, setUsers] = useState([]);
  // const activeSection = useSelector(selectActiveSection);
  // const popupVisible = useSelector(selectPopupVisible);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="dashboard">
      <Header activeSection={activeSection} />
      {activeSection === "chat" ? (
        <Chat />
      ) : (
        <Expenses popupVisible={popupVisible} users={users} />
      )}
    </div>
  );
};

export default Dashboard;
