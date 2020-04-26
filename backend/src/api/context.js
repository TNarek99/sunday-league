import authService from '../modules/user/services/auth.service';
import userService from '../modules/user/services/user.service';

async function context(req) {
  const firebaseToken = req.request.get('Authorization');
  const { uid, phone_number: phoneNumber } = await authService.verifyIdToken(firebaseToken);
  const user = await userService.getUserByFirebase(uid, phoneNumber);
  return { user };
}

export default context;
