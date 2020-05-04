import userModel from '../models/user.model';
import userValidator from '../validators/user.validator';
import { STATUS_ACTIVE } from '../constants';

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
    await userValidator.validateUpdateUserByFirebaseId(firebaseId, userData);
    return userModel.updateByFirebaseId(firebaseId, userData);
  }
}

const userService = new UserService();
export default userService;
