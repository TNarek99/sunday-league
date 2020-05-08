import ForbiddenError from '../../../common/ForbiddenError';
import { STATUS_ACTIVE } from '../../../modules/user/constants';

const MESSAGE_REQUIRES_TO_BE_ACTIVE = 'User must be active';
const MESSAGE_REQUIRES_NOT_TO_BE_ACTIVE = 'User must not be active';

export function requiresToBeNonActive(parent, args, { currentUser }) {
  if (currentUser.status === STATUS_ACTIVE) {
    throw new ForbiddenError(MESSAGE_REQUIRES_NOT_TO_BE_ACTIVE);
  }
}

export function requiresToBeActive(parnt, args, { currentUser }) {
  if (currentUser.status !== STATUS_ACTIVE) {
    throw new ForbiddenError(MESSAGE_REQUIRES_TO_BE_ACTIVE);
  }
}
