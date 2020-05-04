import userModel from '../models/user.model';
import userValidator from '../validators/user.validator';

class UserService {
  async getUsers() {
    return userModel.findAll();
  }

  async getUserByFirebase(firebaseId, mobile) {
    return userModel.findOrCreateByFirebase(firebaseId, mobile);
  }

  async updateUserByFirebaseId(firebaseId, user) {
    await userValidator.validateUpdateUserByFirebaseId(firebaseId, user);
    return userModel.updateByFirebaseId(firebaseId, user);
  }
}

const userService = new UserService();
export default userService;
