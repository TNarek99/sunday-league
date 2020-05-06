import ForbiddenError from '../../../common/ForbiddenError';
import {
  STATUS_ACTIVE, MESSAGE_STATUS_CHANGE_DENIED, MESSAGE_USER_NOT_FOUND,
} from '../constants';

class UserValidator {
  async validateUpdateUser(user, userData) {
    if (user.status === STATUS_ACTIVE && !!userData.status) {
      throw new ForbiddenError(MESSAGE_STATUS_CHANGE_DENIED);
    }
  }
}

const userValidator = new UserValidator();
export default userValidator;
