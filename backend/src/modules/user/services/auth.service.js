import * as firebase from 'firebase-admin';
import firebaseKey from '../../../../credentials/firebase_key.json';

class AuthService {
    FIREBASE_APP_NAME = 'sunday-league';

    constructor() {
      this._setFirebaeApp();
    }

    verifyIdToken(token) {
      return this.app.auth().verifyIdToken(token);
    }

    _setFirebaeApp() {
      if (!this._isFirebaseAppInitialized()) {
        this._initializeFirebaseApp();
      }

      this.app = firebase.apps.find((app) => this._isFirebaseAppValid(app));
    }

    _isFirebaseAppInitialized() {
      return firebase.apps.some((app) => this._isFirebaseAppValid(app));
    }

    _initializeFirebaseApp() {
      const databaseURL = process.env.FB_DB_URL;
      firebase.initializeApp({
        credential: firebase.credential.cert(firebaseKey),
        databaseURL,
      }, this.FIREBASE_APP_NAME);
    }

    _isFirebaseAppValid(app) {
      return app.name === this.FIREBASE_APP_NAME;
    }
}

const authService = new AuthService();
export default authService;
