import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import client from './utils/apollo/apollo_config';
import { ApolloProvider } from '@apollo/react-hooks';
import './utils/firebase/firebase_config';
import AuthProvider from './contexts/authentication/auth_provider';

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
