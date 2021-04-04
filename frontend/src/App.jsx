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
  RegisterRoute,
} from './routes';
import useFetch from './hooks/useFetch';
import { setChannel } from './state/actions/channelAction';

const App = () => {
  const user = useSelector((state) => state.user.user);
  const channels = useFetch('/api/chat/channel');

  return (
    <div className="app">
      <Router>
        {user ? (
          <>
            <Redirect to="/expenses" />
            <Sidebar channels={channels && channels} user={user} />
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
