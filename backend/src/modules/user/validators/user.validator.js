import userModel from '../models/user.model';
import {
  STATUS_ACTIVE, STATUS_CREATED, MESSAGE_STATUS_CHANGE_DENIED, MESSAGE_USER_NOT_FOUND,
} from '../constants';

class UserValidator {
  async validateUpdateUserByFirebaseId(firebaseId, userData) {
    const user = await userModel.findByFirebaseId(firebaseId);
    if (!user) {
      throw new Error(MESSAGE_USER_NOT_FOUND);
    }

    if (user.status === STATUS_ACTIVE && userData.status === STATUS_CREATED) {
      throw new Error(MESSAGE_STATUS_CHANGE_DENIED);
    }
  }
}

const userValidator = new UserValidator();
export default userValidator;
