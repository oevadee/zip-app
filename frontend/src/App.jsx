import React, { useEffect, useState } from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import { Sidebar, MobileNav } from './components';
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
  RegisterRoute,
  SettingsRoute,
  NotificationsRoute,
} from './routes';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/spinner';
import { useBreakpointValue } from '@chakra-ui/media-query';


const App = () => {
  const user = useSelector((state) => state.user.user);
  const { data, mutate } = useSWR(`/api/chat/channel`);
  const sidebardVisible = useBreakpointValue({ base: false, md: true });
  const navOpen = useSelector((state) => state.app.navOpen);
  const [tokenUser, setTokenUser] = useState(null);

  if (!data) return <Spinner color='pink' />;

  return (
    <div className='app'>
      <Router>
        {user ? (
          <>
            <Redirect to='/expenses' />
            {sidebardVisible && (
              <Sidebar user={user} mutate={mutate} channels={data} />
            )}
            {navOpen && (
              <MobileNav user={user} mutate={mutate} channels={data} />
            )}
            <Switch>
              <Route path='/expenses'>
                <ExpensesRoute />
              </Route>
              <Route path='/settings'>
                <SettingsRoute user={user} />
              </Route>
              <Route path='/history/:id'>
                <HistoryRoute user={user} />
              </Route>
              <Route path='/chat/:channelId'>
                <ChatRoute user={user} />
              </Route>
              <Route path='/notifications'>
                <NotificationsRoute user={user} />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <Redirect to='/login' />
            <Route path='/login' component={LoginRoute} />
            <Route path='/register' component={RegisterRoute} />
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
