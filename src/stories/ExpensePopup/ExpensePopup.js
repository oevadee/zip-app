import React, { useState, useRef } from "react";
import "./ExpensePopup.scss";

// Components
import { Avatar } from "@material-ui/core";
import Button from "../Button/Button";

// Redux
// import db, { auth } from "../firebase";
// import firebase from "firebase";
// import { useDispatch, useSelector } from "react-redux";
// import { setAppInfo } from "../features/appSlice";
// import { setPopupOpen } from "../../features/popupSlice";

const ExpensePopup = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);
  const [input, setInput] = useState(0);
  const userSelector = useRef(null)
  // const dispatch = useDispatch();

  const handleExpenseAdd = () => {
    if (selectedUser) {
      // db.collection("users")
      //   .doc(auth.currentUser.uid)
      //   .collection("expensesFrom")
      //   .doc(selectedUser)
      //   .collection(selectedUser)
      //   .add({
      //     value: input,
      //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //   });

      // db.collection("users")
      //   .doc(selectedUser)
      //   .collection("expensesFrom")
      //   .doc(auth.currentUser.uid)
      //   .collection(auth.currentUser.uid)
      //   .add({
      //     value: -input,
      //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //   });

      setInput(0);
      setSelectedUser("");
      // dispatch(
      //   setAppInfo({
      //     expensePopupVisible: false,
      //     currentlyOpen: "My Doe",
      //   })
      // );
      // dispatch(
      //   setPopupOpen({
      //     popupOpen: false,
      //   })
      // );
      userSelector.current.childNodes[prevIndex].style.opacity = 0.3
      console.log("Sent");
    }
  };

  return (
    <div className="expensePopup">
      <div className="expensePopup__userSelector" ref={userSelector}>
        {users
          // .filter((user) => user.uid !== auth.currentUser.uid)
          .map((user, i) => (
            <Avatar
              key={user.uid}
              src={user.photo}
              onClick={() => {
                if(selectedUser) {
                  userSelector.current.childNodes[prevIndex].style.opacity = 0.3;
                  console.log("click", i);
                  setSelectedUser(user.uid);
                  userSelector.current.childNodes[i].style.opacity = 1
                  setPrevIndex(i);
                } else {
                  console.log("click", i);
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button text="Add" onClick={handleExpenseAdd} />
      </div>
    </div>
  );
};

export default ExpensePopup;
