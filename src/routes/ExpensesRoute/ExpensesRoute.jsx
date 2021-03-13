import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import Expense from "../../components/Expesne/Expense";
import { selectPopupVisible } from "../../features/popupSlice";
import db, { auth } from "../../firebase";

const ExpensesRoute = () => {
  const popupVisible = useSelector(selectPopupVisible);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
      <Header />
      {popupVisible && <ExpensePopup users={users} />}
      <div className="expenseSection">
        <div className="expenseHeader">
          <h3 className="expenseHeader__user">User</h3>
          <h3 className="expenseHeader__total">Expense</h3>
          <h3 className="expenseHeader__history">
            <span>History</span>
          </h3>
        </div>
        <div className="expenseList">
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
