import React from 'react';

const UserContext = React.createContext({ currentUser: { loaded: false, sginedIn: false } });

export default UserContext;
