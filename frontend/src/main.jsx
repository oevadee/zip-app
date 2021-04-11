import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import theme from './themes/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <CSSReset />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
