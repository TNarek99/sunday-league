import userService from '../../../modules/user/services/user.service';

export async function usersResolver() {
  return userService.getUsers();
}

export async function currentUserResolver(parent, args, { user: currentUser }) {
  return currentUser;
}

export function updateUserResolver(parent, { user }, { user: currentUser }) {
  return userService.updateUserByFirebaseId(currentUser.uid, user);
}
