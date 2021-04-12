import React from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
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
  SettingsRoute,
} from './routes';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/spinner';

const App = () => {
  const user = useSelector((state) => state.user.user);
  const { data, mutate } = useSWR('/api/chat/channel');

  if (!data) return <Spinner color="pink" />;

  return (
    <div className="app">
      <Router>
        {user ? (
          <>
            <Redirect to="/expenses" />
            <Sidebar user={user} mutate={mutate} channels={data} />
            <Switch>
              <Route path="/expenses">
                <ExpensesRoute />
              </Route>
              <Route path="/settings">
                <SettingsRoute user={user} />
              </Route>
              <Route path="/history/:id">
                <HistoryRoute user={user} />
              </Route>
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
            {/* <Route path="/register" component={RegisterRoute} /> */}
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
