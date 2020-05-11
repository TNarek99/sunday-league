import models from '../../../database';
import ForbiddenError from '../../../common/ForbiddenError';
import NotFoundError from '../../../common/NotFoundError';
import { STATUS_ACTIVE, MESSAGE_USER_NOT_FOUND, MESSAGE_STATUS_CHANGE_DENIED } from '../constants';

class UserService {
  async getUserByFirebase(firebaseId, mobile) {
    return models.user.findOrCreateByFirebase(firebaseId, mobile);
  }

  async getUserById(id) {
    const user = await models.user.findById(id);
    if (!user) {
      throw new NotFoundError(MESSAGE_USER_NOT_FOUND);
    }
    return user;
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
    const user = await this.getUserById(id);
    return this.updateUser(user, userData);
  }

  async updateUser(user, userData) {
    await this.validateUpdateUser(user, userData);
    return user.update(userData);
  }

  async validateUpdateUser(user, userData) {
    if (user.status === STATUS_ACTIVE && !!userData.status) {
      throw new ForbiddenError(MESSAGE_STATUS_CHANGE_DENIED);
    }
  }
}

const userService = new UserService();
export default userService;
