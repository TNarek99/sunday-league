import userModel from '../models/user.model';
import userValidator from '../validators/user.validator';
import NotFoundError from '../../../common/NotFoundError';
import { STATUS_ACTIVE, MESSAGE_USER_NOT_FOUND } from '../constants';

class UserService {
  async getUsers() {
    return userModel.findAll();
  }

  async getUserByFirebase(firebaseId, mobile) {
    return userModel.findOrCreateByFirebase(firebaseId, mobile);
  }

  async activateUserByFirebaseId(firebaseId, userData) {
    return this.updateUserByFirebaseId(firebaseId, { ...userData, status: STATUS_ACTIVE });
  }

  async updateUserByFirebaseId(firebaseId, userData) {
    const user = await userModel.findByFirebaseId(firebaseId);
    if (!user) {
      throw new NotFoundError(MESSAGE_USER_NOT_FOUND);
    }
    return this.updateUser(user, userData);
  }

  async updateUser(user, userData) {
    await userValidator.validateUpdateUser(user, userData);
    const updated = await user.update(userData);
    return updated.id;
  }
}

const userService = new UserService();
export default userService;
