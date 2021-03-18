import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ExpensesRoute.scss";
import { Header } from "../../components";
import db, { auth } from "../../firebase";
import { ExpensePopup, Expense } from "./components";
import { useSelector } from "react-redux";

const ExpensesRoute = () => {
  const popupVisible = useSelector((state) => state.app.popupVisible);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
    
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
            .filter((user) => user.uid !== auth.currentUser.uid)
            .map((user) => (
              <Expense key={user.uid} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};

Expense.propTypes = {
  // user: PropTypes.object.isRequired,
};

Expense.defaultProps = {
  // user: null,
};

export default ExpensesRoute;
