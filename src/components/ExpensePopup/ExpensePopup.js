import React, { useState, useRef } from "react";
import "./ExpensePopup.scss";

// Components
import { Avatar } from "@material-ui/core";
import Button from "../Button/Button";

// Redux
import db, { auth } from "../../firebase";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../../features/sectionSlice";
import { setPopupVisible } from "../../features/popupSlice";

const ExpensePopup = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);
  const [numberInput, setNumberInput] = useState(0);
  const [aboutInput, setAboutInput] = useState('');
  const userSelector = useRef(0);
  const dispatch = useDispatch();

  const handleExpenseAdd = () => {
    if (selectedUser) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("expensesFrom")
        .doc(selectedUser)
        .collection(selectedUser)
        .add({
          value: numberInput,
          aboutTransaction: aboutInput,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      db.collection("users")
        .doc(selectedUser)
        .collection("expensesFrom")
        .doc(auth.currentUser.uid)
        .collection(auth.currentUser.uid)
        .add({
          value: -numberInput,
          aboutTransaction: aboutInput,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      setNumberInput(0);
      setSelectedUser("");
      userSelector.current.childNodes[prevIndex].style.opacity = 0.3;
      dispatch(
        setActiveSection({
          setActiveSection: "expenses",
        })
      );
      dispatch(
        setPopupVisible({
          popupOpen: false,
        })
      );
    }
  };

  return (
    <div className="expensePopup">
      <div className="expensePopup__userSelector" ref={userSelector}>
        {users
          .filter((user) => user.uid !== auth.currentUser.uid)
          .map((user, i) => (
            <Avatar
              key={user.uid}
              src={user.photo}
              onClick={() => {
                if(selectedUser) {
                  userSelector.current.childNodes[prevIndex].style.opacity = 0.3;
                  setSelectedUser(user.uid);
                  userSelector.current.childNodes[i].style.opacity = 1
                  setPrevIndex(i);
                } else {
                  setSelectedUser(user.uid);
                  userSelector.current.childNodes[i].style.opacity = 1
                  setPrevIndex(i);
                }
              }}
            />
          ))}
      </div>
      <div className="expensePopup__expenseValue">
        <input
          type="number"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
          placeholder="How big is the expese?"
        />
        <input
          type="text"
          value={aboutInput}
          onChange={(e) => setAboutInput(e.target.value)}
          placeholder="Describe your expense"
        />
        <Button text="Add" onClick={handleExpenseAdd} />
      </div>
    </div>
  );
};

export default ExpensePopup;
