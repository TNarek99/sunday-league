import React, { useLayoutEffect, useCallback, useState, useContext } from 'react';
import firebase from 'firebase';
import UserContext from '../../contexts/authentication/user_context';

const SignIn = () => {
  const [appVerifier, setAppVerifier] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [code, setCode] = useState('');

  useLayoutEffect(() => {
    setAppVerifier(new firebase.auth.RecaptchaVerifier('recaptcha-verifier', {
      'size': 'normal',
      'callback': function (response) {
        // Captcha solved correctly
        console.log('solved');
      },
      'expired-callback': function () {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    }));
  }, []);

  const signIn = useCallback((e) => {
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setConfirmation(confirmationResult);
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }, [phoneNumber, appVerifier]);

  const signOut = useCallback(() => {
    firebase.auth().signOut();
  }, [])

  const confirmCode = useCallback((e) => {
    confirmation.confirm(code).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }, [code, confirmation]);

  return (
    <div>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button onClick={signIn}>Sign in</button>
      <button onClick={signOut}>Sign out</button>
      {confirmation ?
        <div>
          <input type="number" value={code} onChange={(e) => setCode(e.target.value)} />
          <button onClick={confirmCode}>Confirm Code</button>
        </div> : null
      }
      <div id="recaptcha-verifier" />
    </div>
  )
};

export default SignIn;