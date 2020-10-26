import React, { useEffect, useState } from "react";
import "./styles/Dashboard.scss";

import Button from "./Button";
import Chat from "./Chat";

import db, { auth } from "../firebase";
import Expenses from "./Expenses";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChatOpen,
  setAppInfo,
  selectExpensePopupVisible,
  selectCurrentlyOpen,
} from "../features/appSlice";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const expensePopupVisible = useSelector(selectExpensePopupVisible);
  const chatOpen = useSelector(selectChatOpen);
  const headerText = useSelector(selectCurrentlyOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>{headerText}</h1>
        <Button
          text="New expense"
          onClick={() => {
            dispatch(
              setAppInfo({
                chatOpen: false,
                expensePopupVisible: true,
                currentlyOpen: 'My Doe'
              })
            );
          }}
        />
      </div>
      {chatOpen ? <Chat /> : <Expenses users={users} />}
    </div>
  );
};

export default Dashboard;
