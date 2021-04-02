import React, { useEffect, useState } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar/Sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {
  ChatRoute,
  ExpensesRoute,
  LoginRoute,
  HistoryRoute,
  NotificationsRoute,
  RegisterRoute
} from './routes';

const App = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

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
                <ExpensesRoute />
              </Route>
              <Route path="/history/:id" component={HistoryRoute} />
              <Route path="/chat/:channelId">
                <ChatRoute user={user} />
              </Route>
              <Route path="/notifications">
                <NotificationsRoute />
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
