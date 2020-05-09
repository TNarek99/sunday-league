import React from 'react';
import DomainRoutes from './routes/domain_routes';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import NavBar from './components/navbar/navbar';

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <DomainRoutes />
      </Router>
    </>
  );
}

export default App;
