import userModel from '../models/user.model';
import NotFoundError from '../../../common/NotFoundError';
import ForbiddenError from '../../../common/ForbiddenError';
import {
  STATUS_ACTIVE, MESSAGE_STATUS_CHANGE_DENIED, MESSAGE_USER_NOT_FOUND,
} from '../constants';

class UserValidator {
  async validateUpdateUserByFirebaseId(firebaseId, userData) {
    const user = await userModel.findByFirebaseId(firebaseId);
    if (!user) {
      throw new NotFoundError(MESSAGE_USER_NOT_FOUND);
    }

    if (user.status === STATUS_ACTIVE && !!userData.status) {
      throw new ForbiddenError(MESSAGE_STATUS_CHANGE_DENIED);
    }
  }
}

const userValidator = new UserValidator();
export default userValidator;
