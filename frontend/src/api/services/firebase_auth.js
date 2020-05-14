import { useLayoutEffect, useCallback, useState } from 'react';
import firebase from 'firebase';

export const useFirebaseAuth = (recaptchaContainer, enabled) => {
  const [confirmation, setConfirmation] = useState(null);
  const [appVerifier, setAppVerifier] = useState(null);
  const [errors, setErrors] = useState(null);

  useLayoutEffect(() => {
    if (enabled) {
      setAppVerifier(new firebase.auth.RecaptchaVerifier(recaptchaContainer, { size: 'invisible' }));
    }
  }, [recaptchaContainer, enabled]);

  const signIn = useCallback((phoneNumber) => {
    if (enabled) {
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirmation(confirmationResult);
        }).catch((error) => {
          setErrors(error);
        });
    }
  }, [appVerifier, enabled]);

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