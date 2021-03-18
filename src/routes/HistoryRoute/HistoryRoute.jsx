import { useEffect, useState } from "react";
import "./HistoryRoute.scss";
import { PropTypes } from "prop-types";

// Components
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router";
import { Header } from "../../components";
import db, { auth } from "../../firebase";

const HistoryRoute = ({ historyEl, historyOf }) => {
  const { id } = useParams();
  const [historyArr, setHistoryArr] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("expensesFrom")
      .doc(id)
      .collection(id)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setHistoryArr(snapshot.docs.map((doc) => doc.data()));
      });
    db.collection("users")
      .doc(id)
      .onSnapshot((snap) => {
        setUser(snap.data());
      });
  }, [id]);

  return (
    <div className="history">
      <Header title="History" goBackButton />
      <div className="historySection">
        <div className="historyHeader">
          <h3 className="historyHeader__user">User</h3>
          <h3 className="historyHeader__expense">Expense</h3>
          <h3 className="historyHeader__timestamp">Time</h3>
          <h3 className="historyHeader__about">About</h3>
        </div>

        <div className="historyList">
          {historyArr.map((historyEl) => (
            <div className="tableRow" key={historyEl.timestamp}>
              <div className="tableRow__user">
                <Avatar src={user && user.photo} />
              </div>
              <p className="tableRow__expense">{historyEl.value}</p>
              <p className="tableRow__timestamp">
                {new Date(historyEl.timestamp?.toDate()).toLocaleDateString()}
              </p>
              <p className="tableRow__about">{historyEl.aboutTransaction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

HistoryRoute.propTypes = {
  historyEl: PropTypes.object,
  historyOf: PropTypes.object,
};

export default HistoryRoute;
