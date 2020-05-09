// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import firebaseConfig from "../../credentials/firebase_config.json";

// Add the Firebase services that you want to use
import "firebase/auth";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
