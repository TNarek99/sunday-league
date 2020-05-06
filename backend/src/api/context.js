import { AuthenticationError } from 'apollo-server';
import authService from '../modules/user/services/auth.service';
import userService from '../modules/user/services/user.service';
import { MESSAGE_UNAUTHENTICATED } from '../common/constants';

async function context({ req }) {
  try {
    const firebaseToken = req.headers.authorization;
    const { uid, phone_number: phoneNumber } = await authService.verifyIdToken(firebaseToken);
    const currentUser = await userService.getUserByFirebase(uid, phoneNumber);
    return { currentUser };
  } catch (e) {
    throw new AuthenticationError(MESSAGE_UNAUTHENTICATED);
  }
}

export default context;
