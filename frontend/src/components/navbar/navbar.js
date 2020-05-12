import React, { useContext } from 'react';
import UserContext from '../../contexts/user/user_context';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import './navbar.css';
import { STATUS_ACTIVE } from '../../common/constants/users';

const NavBar = () => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser.loaded) {
    return null;
  }

  if (!currentUser.signedIn) {
    return (
      <nav className='nav-bar'>
        <div className='nav-title'>
          <p>Sunday League</p>
        </div>
      </nav>
    )
  }

  if (currentUser.signedIn && currentUser.status !== STATUS_ACTIVE) {
    return (
      <nav className='nav-bar'>
        <div className='nav-item nav-item-activate'>
          <Link to='/activate'>Activate Profile</Link>
        </div>
      </nav>
    )
  }

  return (
    <nav className='nav-bar'>
      <a className='nav-item nav-logout' onClick={() => firebase.auth().signOut()}>Log Out</a>
      <div className='nav-item nav-item-games'>
        <Link to='/games'>Games</Link>
      </div>
      <div className='nav-item nav-item-open-games'>
        <Link to='/games/openGames'>Open Games</Link>
      </div>
      <div className='nav-item nav-item-profile'>
        <Link to='/profile'>{`${currentUser.firstName} ${currentUser.lastName}`}</Link>
      </div>
      <div className='nav-title'>
        <p>Sunday League</p>
      </div>
    </nav>
  )
};

export default NavBar;
