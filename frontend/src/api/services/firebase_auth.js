import { useLayoutEffect, useCallback, useState } from 'react';
import firebase from 'firebase';

export const useFirebaseAuth = (recaptchaContainer) => {
  const [confirmation, setConfirmation] = useState(null);
  const [appVerifier, setAppVerifier] = useState(null);
  const [errors, setErrors] = useState(null);

  useLayoutEffect(() => {
    setAppVerifier(new firebase.auth.RecaptchaVerifier(recaptchaContainer, { size: 'invisible' }));
  }, [recaptchaContainer]);

  const signIn = useCallback((phoneNumber) => {
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setConfirmation(confirmationResult);
      }).catch((error) => {
        setErrors(error);
      });
  }, [appVerifier]);

  const signOut = useCallback(() => {
    firebase.auth().signOut();
  }, [])

  const confirmCode = useCallback((code) => {
    confirmation.confirm(code).catch((error) => {
      setErrors(error);
    });
  }, [confirmation]);


  return { signIn, confirmCode, signOut, isConfirming: !!confirmation, errors };
};