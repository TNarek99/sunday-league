import React from 'react';
import DomainRoutes from './routes/domain_routes';
import NavBar from './components/navbar/navbar';

const App = () => {
  return (
    <>
      <NavBar />
      <DomainRoutes />
    </>
  );
}

export default App;
