import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

// Components
import "./Expense.scss";
import { Avatar } from "@material-ui/core";

// Icons
import { Clock as HistoryIcon } from "react-feather";

import db, { auth } from "/src/firebase";

// Redux
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks";

const Expense = ({ user }) => {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const data = useFetch(`/expenses/${user.id}`)

  useEffect(() => {
    if (user) {
      // db.collection("users")
      //   .doc(auth.currentUser.uid)
      //   .collection("expensesFrom")
      //   .doc(user.uid)
      //   .collection(user.uid)
      //   .orderBy("timestamp", "desc")
      //   .onSnapshot((snapshot) => {
      //     const data = snapshot.docs
      //       .map((doc) => doc.data().value)
      //       .reduce((acc, curr) => Number(acc) + Number(curr));
      //     setTotal(data);
      //   });
    }
  }, [user]);

  return (
    <div className="expense">
      <div className="expense__user">
        <Avatar src={user.photo} />
        <p>{user.displayName}</p>
      </div>
      <p className="expense__total">{String(total).split(".")[0]}pln</p>
      <div className="expense__history">
        <Link to={`/history/${user.uid}`}>
          <HistoryIcon style={{ color: "#fff" }} />
        </Link>
      </div>
    </div>
  );
};

Expense.propTypes = {
  user: PropTypes.object.isRequired,
};

Expense.defaultProps = {
  user: null,
};

export default Expense;
