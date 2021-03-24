import React from "react";
import "./ExpensesRoute.scss";
import { Header } from "../../components";
import db, { auth } from "../../firebase";
import { ExpensePopup, Expense } from "./components";
import { useSelector } from "react-redux";

const ExpensesRoute = ({ users }) => {
  const popupVisible = useSelector((state) => state.app.popupVisible);
    
  return (
    <div className="expenses">
      <Header title="Expenses" expenseButton />
      {popupVisible && <ExpensePopup users={users} />}
      <div className="expensesSection">
        <div className="expensesHeader">
          <h3 className="expensesHeader__user">User</h3>
          <h3 className="expensesHeader__total">Expense</h3>
          <h3 className="expensesHeader__history">History</h3>
        </div>
        <div className="expensesList">
          {users
            .filter((user) => user.id !== auth.currentUser.uid)
            .map((user) => (
              <Expense key={user.id} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesRoute;
