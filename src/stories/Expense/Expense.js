import React, { useEffect, useState } from "react";

// Components
import "./Expense.scss";
import { Avatar } from "@material-ui/core";

// Icons
import HistoryIcon from "@material-ui/icons/History";

// import db, { auth } from "../firebase";
// import { setAppInfo } from "../features/appSlice";
// import { setHistoryOf } from "../features/historySlice";
// import { useDispatch } from "react-redux";

const Expense = ({ user }) => {
  const [total, setTotal] = useState(0);
  // const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      // db.collection("users")
      //   .doc(auth.currentUser.uid)
      //   .collection("expensesFrom")
      //   .doc(user.uid)
      //   .collection(user.uid)
      //   .orderBy("timestamp", "desc")
      //   .onSnapshot((snapshot) => {
      //     const data = snapshot.docs.map((doc) => doc.data().value);
      //     console.log(data);
      //     let sum = 0;
      //     data.forEach((item) => {
      //       sum += parseInt(item);
      //     });
      //     setTotal(sum);
      //   });
    }
  }, [user]);

  return (
    <div className="expense">
      <div className="expense__user">
        <Avatar src={user.photo} />
        <p>{user.displayName}</p>
      </div>
      <p className="expense__total">
        {total} pln
      </p>
      <div className="expense__history">
        <HistoryIcon onClick={() => {
          // dispatch(
          //   setActiveSection({
          //     activeSection: 'history'
          //   })
          // )
          // dispatch(setHistoryOf({
          //   historyOf: user
          // }))
        }} />
      </div>
    </div>
  );
};

export default Expense;
