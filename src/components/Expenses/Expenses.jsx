import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import "./Expenses.scss";

// Components
import Expense from "../Expesne/Expense";
import ExpensePopup from "../ExpensePopup/ExpensePopup";
import History from "../History/History";

// Firebase
import db, { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectHistoryOf } from "../../features/historySlice";

const Expenses = ({ users, activeSection, popupVisible }) => {
  const historyOf = useSelector(selectHistoryOf);
  const [historyArr, setHistoryArr] = useState([]);

  useEffect(() => {
    if (historyOf) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("expensesFrom")
        .doc(historyOf.uid)
        .collection(historyOf.uid)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setHistoryArr(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [historyOf]);

  return (
    <>
      {popupVisible ? <ExpensePopup users={users} /> : <></>}
      <div className="expenseSection">
        <div className="expenseHeader">
          <h3
            className={
              activeSection === "history"
                ? `historyHeader__user`
                : `expenseHeader__user`
            }
          >
            User
          </h3>
          <h3
            className={
              activeSection === "history"
                ? `historyHeader__total`
                : `expenseHeader__total`
            }
          >
            {activeSection === "history" ? "Expense" : "Total"}
          </h3>
          <h3
            className={
              activeSection === "history"
                ? `historyHeader__timestamp`
                : `expenseHeader__history`
            }
          >
            {activeSection === "history" ? "Time" : <span>History</span>}
          </h3>
          {activeSection === "history" && (
            <h3 className="historyHeader__about">About</h3>
          )}
        </div>
        {activeSection === "history" ? (
          <div className="historyList">
            {historyArr.map((historyEl) => (
              <History key={historyEl} historyEl={historyEl} historyOf={historyOf} />
            ))}
          </div>
        ) : (
          <div className="expenseList">
            {users
              .filter((user) => user.uid !== auth.currentUser.uid)
              .map((user) => (
                <Expense key={user.uid} user={user} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

Expenses.propTypes = {
  users: PropTypes.array,
  activeSection: PropTypes.string,
  popupVisible: PropTypes.bool,
};

Expenses.defaultProps = {
  users: [],
  popupVisible: false,
};

export default Expenses;
