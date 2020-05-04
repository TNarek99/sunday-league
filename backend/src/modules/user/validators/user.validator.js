import userModel from '../models/user.model';
import { STATUS_ACTIVE, STATUS_CREATED } from '../constants';

class UserValidator {
    MESSAGE_USER_NOT_FOUND = 'User not found';

    MESSAGE_STATUS_CHANGE_DENIED = 'Status change denied';

    async validateUpdateUserByFirebaseId(firebaseId, userData) {
      const user = await userModel.findByFirebaseId(firebaseId);
      if (!user) {
        throw new Error(this.MESSAGE_USER_NOT_FOUND);
      }

      if (user.status === STATUS_ACTIVE && userData.status === STATUS_CREATED) {
        throw new Error(this.MESSAGE_STATUS_CHANGE_DENIED);
      }
    }
}

const userValidator = new UserValidator();
export default userValidator;
