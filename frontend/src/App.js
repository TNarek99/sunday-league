import React from 'react';
import DomainRoutes from './routes/domain_routes';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';

const App = () => {
  return (
    <>
      <button onClick={() => firebase.auth().signOut()}>GET OUT</button>
      <Router>
        <DomainRoutes />
      </Router>
    </>
  );
}

export default App;
