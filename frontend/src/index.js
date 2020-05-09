import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import client from './initializers/apollo/apollo_config';
import { ApolloProvider } from '@apollo/react-hooks';
import './initializers/firebase/firebase_config';
import UserProvider from './contexts/user/user_provider';

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
