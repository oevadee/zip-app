import React from "react";
import "./styles/Expenses.scss";

// Components
import Expense from "./Expense";
import ExpensePopup from "./ExpensePopup";

// Redux
import db, { auth } from "../firebase";
import { useSelector } from "react-redux";
import History from "./History";

const Expenses = ({ users }) => {
  return (
    <>
      <ExpensePopup users={users} />
      <div className="expenseSection">
        <div className="expenseHeader">
          <h3 className="expenseHeader__user">User</h3>
          <h3 className="expenseHeader__total">Total</h3>
          <h3 className="expenseHeader__history">History</h3>
        </div>
        <div className="expenseList">
          {users
            .filter((user) => user.uid !== auth.currentUser.uid)
            .map((user) => (
              <Expense key={user.uid} user={user} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Expenses;
