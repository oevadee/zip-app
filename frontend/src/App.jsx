import React, { useEffect, useState } from 'react';
import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
import {
  ChatRoute,
  ExpensesRoute,
  LoginRoute,
  HistoryRoute,
  NotificationsRoute,
} from './routes';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './state/actions/userAction';
import db, { auth } from './firebase';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useFetch } from './hooks';
import RegisterRoute from './routes/RegisterRoute/RegisterRoute';

const App = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const userDispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const data = useFetch('/users');

  useEffect(() => {
    data && setUsers(data);
  }, [data]);

  console.log(users);

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     console.log(authUser);
  //     if (authUser) {
  //       userDispatch(
  //         loginUser({
  //           name: authUser.displayName,
  //           email: authUser.email,
  //           photo: authUser.photoURL,
  //         }),
  //       );
  //     } else {
  //       userDispatch(logoutUser());
  //     }
  //   });
  // }, []);

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
            <Route path="/login" component={LoginRoute} />
            <Route path="/register" component={RegisterRoute} />
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
