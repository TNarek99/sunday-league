import React from 'react';
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
