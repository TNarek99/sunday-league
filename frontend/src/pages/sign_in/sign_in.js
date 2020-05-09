import React, { useState, useContext } from 'react';
import { useFirebaseAuth } from '../../api/services/firebase_auth';
import UserContext from '../../contexts/user/user_context';
import { Redirect } from 'react-router-dom';

import InputWithLabel from '../../components/input_with_label/input_with_label';
import Button from '../../components/button/button';

const SignIn = () => {
  const { currentUser } = useContext(UserContext);
  const {
    signIn,
    confirmCode,
    signOut,
    isConfirming,
    errors
  } = useFirebaseAuth('recaptcha-verifier', currentUser.loaded && !currentUser.signedIn);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');

  if (!currentUser.loaded) {
    return <p>Loading...</p>
  }

  if (currentUser.signedIn) {
    return <Redirect to='/' />;
  };

  return (
    <div>
      {errors && <p>Something went wrong</p>}
      {
        currentUser && currentUser.loaded && currentUser.signedIn ?
          <div>
            <p>Already Signed In: Log out?</p>
            <button onClick={signOut}>Sign out</button>
          </div> :
          <div>
            <InputWithLabel label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            {isConfirming ?
              <div>
                <InputWithLabel label="Verification Code" value={code} onChange={(e) => setCode(e.target.value)} />
                <Button label="Confirm Verification" onClick={(e) => confirmCode(code)} />
              </div> : null
            }
            <Button id="recaptcha-verifier" onClick={() => signIn(phoneNumber)} label="Sign In" />
          </div>
      }
    </div>
  )
};

export default SignIn;