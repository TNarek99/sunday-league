import { AuthenticationError } from 'apollo-server';
import authService from '../modules/user/services/auth.service';
import userService from '../modules/user/services/user.service';
import { MESSAGE_UNAUTHENTICATED } from './messages';

async function context({ req }) {
  try {
    const firebaseToken = req.headers.authorization;
    const { uid, phone_number: phoneNumber } = await authService.verifyIdToken(firebaseToken);
    const user = await userService.getUserByFirebase(uid, phoneNumber);
    return { user };
  } catch (e) {
    throw new AuthenticationError(MESSAGE_UNAUTHENTICATED);
  }
}

export default context;
