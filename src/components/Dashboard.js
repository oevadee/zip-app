import React, { useEffect, useState } from "react";
import "./styles/Dashboard.scss";

import Chat from "./Chat";

import db, { auth } from "../firebase";
import Expenses from "./Expenses";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveSection, setAppInfo } from "../features/appSlice";
import Header from "../stories/Header";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <Chat />
      {/* <Expenses users={users} /> */}
    </div>
  );
};

export default Dashboard;
