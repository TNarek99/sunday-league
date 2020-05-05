import React from 'react';
import SignIn from './pages/sign_in/sign_in';
import DomainRoutes from './routes/domain_routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <DomainRoutes />
    </Router>
  );
}

export default App;
