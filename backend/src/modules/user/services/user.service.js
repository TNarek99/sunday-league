import userModel from '../../../database/models/user.model';

class UserService {
  async getUsers() {
    return userModel.findAll();
  }
}

const userService = new UserService();
export default userService;
