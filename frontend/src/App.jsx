import React, { useEffect, useState } from "react";
import "./App.scss";

import Sidebar from "./components/Sidebar/Sidebar";
import {
  ChatRoute,
  ExpensesRoute,
  LoginRoute,
  HistoryRoute,
  NotificationsRoute,
} from "./routes";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./state/actions/userAction";
import db, { auth } from "./firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const userDispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        userDispatch(
          loginUser({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
        db.collection("users").doc(authUser.uid).set({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        });
      } else {
        userDispatch(logoutUser());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {user ? (
          <>
            <Redirect to="/expenses" />
            <Sidebar
              user={user}
              mobileNavOpen={mobileNavOpen}
              setMobileNavOpen={setMobileNavOpen}
            />
            <Switch>
              <Route path="/expenses">
                <ExpensesRoute users={users} />
              </Route>
              <Route path="/history/:id" component={HistoryRoute} />
              <Route path="/chat/:channelId">
                <ChatRoute user={user} />
              </Route>
              <Route path="/notifications">
                <NotificationsRoute users={users} />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <Redirect to="/login" />
            <Route path="/login">
              <LoginRoute />
            </Route>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;