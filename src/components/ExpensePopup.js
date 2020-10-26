import React, { useState, useEffect, useRef } from "react";
import "./styles/ExpensePopup.scss";

// Components
import { Avatar } from "@material-ui/core";
import Button from "./Button";

// Redux
import db, { auth } from "../firebase";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectExpensePopupVisible, setAppInfo } from "../features/appSlice";

const ExpensePopup = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [input, setInput] = useState(0);
  const expensePopupVisible = useSelector(selectExpensePopupVisible);
  const dispatch = useDispatch();

  const avatar = useRef(null);

  const handleExpenseAdd = () => {
    if (selectedUser) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("expensesFrom")
        .doc(selectedUser)
        .collection(selectedUser)
        .add({
          value: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      db.collection("users")
        .doc(selectedUser)
        .collection("expensesFrom")
        .doc(auth.currentUser.uid)
        .collection(auth.currentUser.uid)
        .add({
          value: -input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      setInput(0);
      setSelectedUser("");
      avatar.current.style.opacity = 0.3;
      dispatch(
        setAppInfo({
          expensePopupVisible: false,
          currentlyOpen: 'My Doe'
        })
      )
      console.log("Sent");
    }
  };

  return (
    <div className="expensePopup">
      <div className="expensePopup__userSelector">
        {users
          .filter((user) => user.uid !== auth.currentUser.uid)
          .map((user) => (
            <Avatar
              key={user.uid}
              ref={avatar}
              src={user.photo}
              onClick={() => {
                console.log("click", avatar);
                setSelectedUser(user.uid);
                avatar.current.style.opacity = 1;
              }}
              onBlur={() => (avatar.current.style.opacity = 0.3)}
            />
          ))}
      </div>
      <div className="expensePopup__expenseValue">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button text="Add" onClick={handleExpenseAdd} />
      </div>
    </div>
  );
};

export default ExpensePopup;
