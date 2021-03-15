import { useEffect, useState } from "react";
import "./App.scss";

import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./components/LoginPage/LoginPage";
import { ChatRoute, ExpensesRoute } from "./routes";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./state/actions/userAction";
import db, { auth } from "./firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const userDispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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
            <Redirect to="/" />
            <Sidebar
              user={user}
              mobileNavOpen={mobileNavOpen}
              setMobileNavOpen={setMobileNavOpen}
            />
            <Switch>
              <Route path="/expenses">
                <ExpensesRoute />
              </Route>
              <Route path="/chat/:channelId">
                <ChatRoute user={user} />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <Redirect to="/login" />
            <Route path="/login">
              <LoginPage />
            </Route>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
