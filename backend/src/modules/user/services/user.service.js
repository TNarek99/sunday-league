import models from '../../../database';
import userValidator from '../validators/user.validator';
import NotFoundError from '../../../common/NotFoundError';
import { STATUS_ACTIVE, MESSAGE_USER_NOT_FOUND } from '../constants';

class UserService {
  async getUserByFirebase(firebaseId, mobile) {
    return models.user.findOrCreateByFirebase(firebaseId, mobile);
  }

  async activateUserByFirebaseId(firebaseId, userData) {
    return this.updateUserByFirebaseId(firebaseId, { ...userData, status: STATUS_ACTIVE });
  }

  async updateUserByFirebaseId(firebaseId, userData) {
    const user = await models.user.findByFirebaseId(firebaseId);
    if (!user) {
      throw new NotFoundError(MESSAGE_USER_NOT_FOUND);
    }

    return this.updateUser(user, userData);
  }

  async updateUserById(id, userData) {
    const user = await models.user.findById(id);
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
