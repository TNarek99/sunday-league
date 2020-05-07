import userService from '../../../modules/user/services/user.service';
import { authorizeUpdateUser } from './authorizers';

export async function currentUserResolver(parent, args, { currentUser }) {
  return currentUser;
}

export async function activateUserResolver(parent, { user }, { currentUser }) {
  return userService.activateUserByFirebaseId(currentUser.firebaseId, user);
}

export async function updateUserResolver(parent, args, { currentUser }) {
  authorizeUpdateUser(currentUser, args);
  return userService.updateUserById(args.id, args.user);
}
