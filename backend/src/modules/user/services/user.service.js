import userModel from '../models/user.model';

class UserService {
  async getUsers() {
    return userModel.findAll();
  }

  async getUserByFirebase(firebaseId, mobile) {
    return userModel.findOrCreateUserByFirebase(firebaseId, mobile);
  }
}

const userService = new UserService();
export default userService;
